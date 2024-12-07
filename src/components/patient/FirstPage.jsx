// FirstPage.jsx
import React, { useState } from 'react';
import { patientSignup } from '../../services/patientApi';
import Header from '../Header';
import { NavLink } from 'react-router-dom';

function FirstPage({ setNext, setEmail }) {
  const [match, setMatch] = useState(true);
  const [exist, setExist] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMatch(false);
      return;
    }
    setMatch(true);

    try {
      const response = await patientSignup({ email: emailAddress, password });
      if (response?.status === 'done') {
        setEmail(emailAddress);
        setNext(1);
      } else {
        setExist(true);
      }
    } catch (error) {
      console.error('Signup failed', error);
      setExist(true);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up as Patient
          </h2>
        </div>
        
        <form onSubmit={handleNext} className="mt-8 space-y-6">
          {exist && <p style={{ color: 'red' }}>Email already registered</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default FirstPage;
