import axios from 'axios';

const API = axios.create({ 
  baseURL: 'https://orbitix-backend.onrender.com/api' 
});


API.interceptors.request.use((req) => {

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;