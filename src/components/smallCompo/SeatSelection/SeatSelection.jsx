import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import API from '../../../services/api'; // Your centralized API service

// Connect to your backend's Socket.IO server
const socket = io('https://event-booking-app-t7fw.onrender.com'); // Use your deployed backend URL

const SeatSelection = ({ eventId }) => {
  const [seatingChart, setSeatingChart] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeatingChart = async () => {
      try {
        const { data } = await API.get(`/attractions/${eventId}`);
        if (data.seatingChart) {
          setSeatingChart(data.seatingChart);
        } else {
          setError('Seating information is not available for this event.');
        }
      } catch (err) {
        setError('Failed to load seating chart.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeatingChart();

    socket.emit('joinEventRoom', eventId);

    const handleSeatUpdate = (updatedSeat) => {
        setSeatingChart(currentChart => {
            const newLayout = JSON.parse(JSON.stringify(currentChart.layout));
            for (const row of newLayout) {
                const seatToUpdate = row.seats.find(s => s.number === updatedSeat.seatNumber);
                if (seatToUpdate) {
                    seatToUpdate.status = updatedSeat.status;
                    break;
                }
            }
            return { ...currentChart, layout: newLayout };
        });
    };

    socket.on('updateSeatStatus', handleSeatUpdate);

    return () => {
      socket.off('updateSeatStatus', handleSeatUpdate);
      socket.emit('leaveEventRoom', eventId);
    };
  }, [eventId]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked' || (seat.status === 'selected' && !selectedSeats.includes(seat.number))) {
      return;
    }

    const isAlreadySelected = selectedSeats.includes(seat.number);
    let newSelectedSeats;
    if (isAlreadySelected) {
      newSelectedSeats = selectedSeats.filter(s => s !== seat.number);
      socket.emit('seatDeselected', { eventId, seatNumber: seat.number });
    } else {
      newSelectedSeats = [...selectedSeats, seat.number];
      socket.emit('seatSelected', { eventId, seatNumber: seat.number });
    }
    setSelectedSeats(newSelectedSeats);
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    try {
      await API.post('/bookings', { eventId, seatNumbers: selectedSeats });
      alert('Booking successful!');
      setSelectedSeats([]);
      // You should refetch the chart or navigate
    } catch (err) {
      alert('Booking failed. The seats may have been taken. Please refresh and try again.');
    }
  };

  if (isLoading) return <p className="text-gray-300">Loading seating plan...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!seatingChart) return <p className="text-gray-400">No seating plan available.</p>;

  const totalPrice = selectedSeats.reduce((total, seatNumber) => {
      for (const row of seatingChart.layout) {
          const seat = row.seats.find(s => s.number === seatNumber);
          if (seat) {
              return total + (seatingChart.pricing[seat.priceTier] || 0);
          }
      }
      return total;
  }, 0);
  
  // Helper to determine seat styling
  const getSeatClassName = (seat) => {
    const isSelectedByUser = selectedSeats.includes(seat.number);
    let baseClasses = "w-8 h-8 rounded-md flex justify-center items-center text-xs font-bold cursor-pointer transition-transform duration-200 select-none";
    
    if (isSelectedByUser) {
      return `${baseClasses} bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.8)] scale-110`;
    }
    if (seat.status === 'available') {
      return `${baseClasses} bg-blue-600 text-white hover:scale-110`;
    }
    if (seat.status === 'selected') {
      return `${baseClasses} bg-amber-500 cursor-not-allowed`;
    }
    if (seat.status === 'booked') {
      return `${baseClasses} bg-gray-700 text-gray-500 cursor-not-allowed`;
    }
    return baseClasses;
  };

  return (
    <div className="flex flex-col items-center bg-[#1a1a1a] p-4 sm:p-8 rounded-xl text-white w-full max-w-3xl mx-auto my-8">
      <div className="w-4/5 bg-gray-700 p-2 mb-8 text-center font-bold tracking-widest rounded-t-lg shadow-lg">SCREEN</div>
      
      <div className="flex flex-col gap-2">
        {seatingChart.layout.map((row) => (
          <div key={row.row} className="flex items-center gap-2">
            <div className="w-5 text-center font-bold text-gray-500">{row.row}</div>
            {row.seats.map((seat) => (
              <div
                key={seat.number}
                className={getSeatClassName(seat)}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.number.replace(row.row, '')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-blue-600"></div> Available</div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-green-500"></div> Your Selection</div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-amber-500"></div> Reserved</div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-gray-700"></div> Booked</div>
      </div>
      
      <div className="mt-8 text-center w-full">
        {selectedSeats.length > 0 ? (
          <>
            <p className="text-lg">Selected Seats: <span className="font-bold text-green-400">{selectedSeats.join(', ')}</span></p>
            <p className="text-2xl font-bold my-2 text-green-500">Total: ₹{totalPrice.toFixed(2)}</p>
            <button 
              onClick={handleBooking} 
              className="bg-white text-black font-bold py-3 px-8 rounded-lg cursor-pointer transition-colors duration-200 mt-4 hover:bg-gray-300 disabled:bg-gray-400"
            >
              Book Tickets
            </button>
          </>
        ) : (
          <p className="text-gray-400">Please select your seats from the chart above.</p>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;