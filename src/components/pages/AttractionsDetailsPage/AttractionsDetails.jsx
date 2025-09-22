import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../smallCompo/Navbar/Navbar';

function AttractionsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await API.get(`/attractions/${id}`);
        setDetails(data);
      } catch (err) {
        setError('Could not fetch event details.');
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [id]);

  const handleBooking = async () => {
    // ... (no changes in this function)
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      const bookingData = {
        eventId: details._id,
        eventName: details.name,
        eventDate: details.date,
        venue: details.venue,
        imageUrl: details.imageUrl,
      };
      await API.post('/bookings', bookingData);
      alert('Booking successful!');
      navigate('/mytickets');
    } catch (err) {
      alert('Booking failed. Please try again.');
    }
  };

  if (isLoading) return <p className="text-white text-center p-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center p-8">{error}</p>;
  if (!details) return <p className="text-white text-center p-8">Event not found.</p>;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">
        <img src={details.imageUrl} alt={details.name} className="w-full md:w-1/2 rounded-lg object-cover shadow-lg" />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{details.name}</h1>
          <p className="text-lg text-gray-400 mb-4">{new Date(details.date).toDateString()} at {details.venue}</p>
          <p className="text-gray-300 mb-6">{details.description}</p>
          <div className="flex items-center gap-4">
            <button onClick={handleBooking} className="bg-white text-black font-bold py-3 px-8 rounded-lg w-auto hover:bg-gray-300 transition">
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AttractionsDetails;