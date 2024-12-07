import React, { useState } from 'react';
import axios from 'axios';

const HospitalLoginPage = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/hospital/login', {
        hospitalName,
        password,
      });
      if (response.data.hospitalName === hospitalName && response.data.password === password) {
        
        setLoggedIn(true);
      } else {
        
        setError('Invalid hospital name or password');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error logging in');
      setLoading(false);
    }
  };

  if (loggedIn) {
    return <HospitalDashboard hospitalName={hospitalName} />;
  }

  return (
    <div>
      <h1>Hospital Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Hospital Name:</label>
        <input
          type="text"
          value={hospitalName}
          onChange={(event) => setHospitalName(event.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

const HospitalDashboard = ({ hospitalName }) => {
  return (
    <div>
      <h1>Hospital Dashboard</h1>
      <p>Welcome, {hospitalName}!</p>
      {/* Add hospital dashboard content here */}
    </div>
  );
};

export default HospitalLoginPage;