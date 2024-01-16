// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className="flex justify-between items-center p-4rounded-xl shadow-lg text-black mb-4">
      <Link to="/" className="text-4xl  flex items-center font-extrabold  justify-center mb-4">
      <span className='text-green-400'>Hack </span> <span className='text-black'>Ideas</span>
      </Link>

      

      {user ? (
        <div className="flex items-center space-x-4">
          <span className='text-2xl text-blue-600'>Welcome,{user.employeeId }</span>
          <button className='border rounded-md p-2 bg-red-400' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login"  className='ocus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Login</Link>
      )}
    </div>
  );
}

export default Navbar;
