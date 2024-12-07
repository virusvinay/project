// SecondPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SecondPage({ email }) {
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    const { FName, LName, mobile, gender, DOB, street, city, state, pinCode } = e.target;

    const data = {
      email,
      name: { FName: FName.value, LName: LName.value },
      mobile: mobile.value,
      gender: gender.value,
      DOB: DOB.value,
      address: {
        street: street.value,
        city: city.value,
        state: state.value,
        pin: pinCode.value,
      },
    };

    try {
      const response = await axios.post('/api/patient/profile', data);
      navigate('/patient/dashboard', { state: response.data });
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <form onSubmit={handleSave}>
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div>
              <label>First Name</label>
              <input name="FName" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>Last Name</label>
              <input name="LName" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>Mobile</label>
              <input name="mobile" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" className="border border-gray-300 px-2 py-1">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label>Date of Birth</label>
              <input name="DOB" type="date" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>Street</label>
              <input name="street" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>City</label>
              <input name="city" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>State</label>
              <input name="state" className="border border-gray-300 px-2 py-1" />
            </div>
            <div>
              <label>Pin Code</label>
              <input name="pinCode" className="border border-gray-300 px-2 py-1" />
            </div>
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SecondPage;
