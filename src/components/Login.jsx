import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, Navigate } from 'react-router-dom';

function Login() {
  const { user, signInWithEmployeeId } = useAuth();
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!employeeId.trim()) {
        setError('Employee ID cannot be empty');
        return;
      }

      await signInWithEmployeeId(employeeId);
    } catch (error) {
      setError('Invalid employee ID');
    }
  };

  if (user) {
    // Redirect to home if the user is already logged in
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div className="mb-4">
        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-600">
          Employee ID
        </label>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
     
    </div>
  );
}

export default Login;
