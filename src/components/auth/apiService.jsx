import axios from 'axios';

// Create an Axios instance with a base URL for your backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Use an interceptor to add the JWT to the authorization header for every request
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;