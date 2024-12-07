import React, { useState } from 'react';
import axios from 'axios';

const HospitalRegister = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalPhone, setHospitalPhone] = useState('');
  const [hospitalEmail, setHospitalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hospitalName || !hospitalAddress || !hospitalPhone || !hospitalEmail || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const hospitalData = {
      hospitalName,
      hospitalAddress,
      hospitalPhone,
      hospitalEmail,
      password,
    };
    axios.post('https://your-api-url.com/hospitals', hospitalData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="hospital-register-container">
      <h1>Hospital Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(event) => setHospitalName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hospital Address:</label>
          <input
            type="text"
            value={hospitalAddress}
            onChange={(event) => setHospitalAddress(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hospital Phone:</label>
          <input
            type="tel"
            value={hospitalPhone}
            onChange={(event) => setHospitalPhone(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hospital Email:</label>
          <input
            type="email"
            value={hospitalEmail}
            onChange={(event) => setHospitalEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register Hospital</button>
      </form>
    </div>
  );
};

export default HospitalRegister;