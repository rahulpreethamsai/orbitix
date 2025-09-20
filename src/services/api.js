import axios from 'axios';

// The single source of truth for your backend URL.
const API = axios.create({ 
  baseURL: 'https://event-booking-app-t7fw.onrender.com/api' 
});

// This interceptor automatically attaches the user's JWT
// to the headers of every request.
API.interceptors.request.use((req) => {
  // We get the user object from localStorage, parse it, and then get the token.
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;