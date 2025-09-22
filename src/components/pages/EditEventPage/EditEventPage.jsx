import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../services/api';
import Navbar from '../../smallCompo/Navbar/Navbar';

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    venue: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch the current event data when the page loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);
        // Format the date correctly for the date input field (YYYY-MM-DD)
        const formattedDate = new Date(data.date).toISOString().split('T')[0];
        setFormData({
          name: data.name,
          description: data.description,
          date: formattedDate,
          venue: data.venue,
          imageUrl: data.imageUrl,
        });
      } catch (err) {
        setError('Failed to fetch event data.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.put(`/events/${id}`, formData);
      alert('Event updated successfully!');
      navigate(`/events/${id}`); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event.');
    }
  };

  if (loading) return <p className="text-white text-center p-8">Loading Event...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Event</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#1F1F1F] p-8 rounded-lg">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Event Name</label>
            <input id="name" name="name" type="text" value={formData.name} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea id="description" name="description" rows="4" value={formData.description} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
            <input id="date" name="date" type="date" value={formData.date} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
          </div>
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-300">Venue</label>
            <input id="venue" name="venue" type="text" value={formData.venue} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image URL</label>
            <input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white" />
          </div>
          <button type="submit" className="w-full py-3 px-4 rounded-md font-bold text-black bg-white hover:bg-gray-200 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEventPage;