import axios from 'axios';

// The single source of truth for your backend URL.
// Change the baseURL from your local address to your new live Render URL.
const API = axios.create({ 
  // PREVIOUSLY: baseURL: 'http://localhost:5000/api'
  // UPDATED:
  baseURL: 'https://event-booking-app-t7fw.onrender.com/api' 
});

/**
 * This interceptor automatically attaches the user's authentication token
 * to the headers of every single request sent to your backend.
 * * This is how your protected routes (like creating a booking or
 * viewing 'My Tickets') will work. The backend receives the token,
 * validates it with the authMiddleware, and confirms who the user is.
 */
API.interceptors.request.use((req) => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    req.headers.Authorization = `Bearer ${userToken}`;
  }
  return req;
});

export default API;
