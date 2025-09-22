import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../smallCompo/Navbar/Navbar';

// ... rest of the component code is the same
function MyTicketsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data } = await API.get('/bookings/mybookings');
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">My Tickets</h1>
        {loading ? (
          <p>Loading your tickets...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-400">You have no booked tickets yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-[#1F1F1F] rounded-lg overflow-hidden shadow-lg">
                <img src={booking.imageUrl} alt={booking.eventName} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{booking.eventName}</h2>
                  <p className="text-gray-400">{booking.venue}</p>
                  <p className="text-gray-300 mt-2">{new Date(booking.eventDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTicketsPage;