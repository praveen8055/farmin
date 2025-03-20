// components/RegisterForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/storecontext';
import {Link, useNavigate} from 'react-router-dom'
const RegisterForm = ({ onSuccess, switchToLogin }) => {
  const { setToken,API_URL } = useContext(StoreContext);
  const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const  navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    if (data.password.length < 8) {
        return setError('Password must be at least 8 characters');
      }
      if (!/[A-Z]/.test(data.password)) {
        return setError('Password must contain at least one uppercase letter');
      }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/user-register`, {
        name: data.name,
        email: data.email,
        password: data.password
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token); 
      onSuccess();
      navigate('/')  ;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='text-black'>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={data.confirmPassword}
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        className="w-full mb-6 p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-400 transition-colors"
      >
        {isLoading ? 'Creating Account...' : 'Register'}
      </button>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-green-600 hover:underline"
        >
          Sign in here
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;