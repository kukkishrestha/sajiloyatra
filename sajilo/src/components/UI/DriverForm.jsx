import React from 'react';

const DriverRegistrationForm = () => {
  return (
    <form style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Driver Registration</h2>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="drivingLicensePhoto" style={{ display: 'block', marginBottom: '5px' }}>Driving License Photo:</label>
        <input
          type="file"
          id="drivingLicensePhoto"
          name="drivingLicensePhoto"
          accept="image/*"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          required
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Register
      </button>
    </form>
  );
};

export default DriverRegistrationForm;
