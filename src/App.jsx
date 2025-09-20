import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/Home';
import AuthForm from './components/auth/AuthForm';
import AttractionsPage from './components/pages/AttractionsPage/AttractionsPage';
import AttractionsDetails from './components/pages/AttractionsDetailsPage/AttractionsDetails';
import MyTicketsPage from './components/pages/MyTicketsPage/MyTicketsPage';
import AboutUs from './components/pages/AboutUsPage/AboutPage';

function App() {
  // No <Router> here! It's now in main.jsx
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/events" element={<AttractionsPage />} />
      <Route path="/events/:id" element={<AttractionsDetails />} />
      <Route path="/mytickets" element={<MyTicketsPage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
