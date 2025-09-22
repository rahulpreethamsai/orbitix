import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // CORRECTED PATH

// ... rest of the component code is the same
function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='w-full bg-transparent flex flex-row justify-around items-center text-white font-mono p-1'>
      <Link to='/'>
        <img src='https://i.gifer.com/GfC6.gif' className='w-15 cursor-pointer' alt='logo-gif' />
      </Link>
      <div className='flex flex-row justify-evenly gap-10 items-center'>
        <Link to='/' className='hover:text-green-400'>HOME</Link>
        <Link to='/attractions' className='hover:text-red-400'>EVENTS</Link>
        {isLoggedIn && (
            <Link to='/mytickets' className='hover:text-blue-400'>MY TICKETS</Link>
        )}
      </div>
      {isLoggedIn ? (
        <button onClick={handleLogout} className='font-bold border rounded-2xl p-2 hover:bg-white hover:text-black'>
          LOGOUT
        </button>
      ) : (
        <Link to='/login'>
          <button className='font-bold border rounded-2xl p-2 hover:bg-white hover:text-black'>
            LOGIN
          </button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;