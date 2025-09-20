import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // CORRECTED PATH
import API from '../../services/api'; // CORRECTED PATH

// ... rest of the component code is the same
const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isSignUp ? '/users/register' : '/users/login';

    try {
      const { data } = await API.post(endpoint, formData);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold">Welcome</h2>
          <p className="text-gray-400">{isSignUp ? 'Create an account' : 'Sign in'}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-lg">
          <button onClick={() => setIsSignUp(false)} className={`py-2 rounded-md ${!isSignUp ? 'bg-white text-black' : 'bg-transparent text-white'}`}>Sign In</button>
          <button onClick={() => setIsSignUp(true)} className={`py-2 rounded-md ${isSignUp ? 'bg-white text-black' : 'bg-transparent text-white'}`}>Sign Up</button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input id="name" name="name" type="text" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input id="email" name="email" type="email" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input id="password" name="password" type="password" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white" />
          </div>
          <button type="submit" className="w-full py-3 px-4 rounded-md font-bold text-black bg-white hover:bg-gray-200">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;