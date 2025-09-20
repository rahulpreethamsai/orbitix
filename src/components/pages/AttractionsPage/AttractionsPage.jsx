import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../services/api';
import Navbar from '../../smallCompo/Navbar/Navbar';

function AttractionsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/events');
        setEvents(data);
      } catch (err) {
        setError('Could not fetch events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className='min-h-screen w-full bg-black text-white'>
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8">UPCOMING EVENTS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (<p>Loading...</p>)
          : error ? (<p className='text-red-500'>{error}</p>)
          : events.map((event) => (
              <div key={event._id} className="relative group shadow-lg hover:scale-105 rounded-xl transition-transform duration-300 cursor-pointer overflow-hidden">
                <Link to={`/events/${event._id}`}>
                  <img src={event.imageUrl} alt={event.name} className="w-full h-80 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <p className="text-sm text-gray-300">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default AttractionsPage;