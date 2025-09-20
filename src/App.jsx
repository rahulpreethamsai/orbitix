import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/Home';
import AuthForm from './components/auth/AuthForm';
import AttractionsPage from './components/pages/AttractionsPage/AttractionsPage';
import AttractionsDetails from './components/pages/AttractionsDetailsPage/AttractionsDetails';
import MyTicketsPage from './components/pages/MyTicketsPage/MyTicketsPage'; // New Page
import { AuthProvider } from './components/auth/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/events" element={<AttractionsPage />} />
          <Route path="/events/:id" element={<AttractionsDetails />} />
          <Route path="/mytickets" element={<MyTicketsPage />} /> {/* New Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;