import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // For notifications
import { handleError, handleSuccess } from '../../util';  // Assuming you have utility functions for error/success handling
import '../../styles/update-button.css'

function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [loggedInUserPhone, setLoggedInUserPhone] = useState('');

  useEffect(() => {
    setLoggedInUser(location.state.loggedInUser);
    setLoggedInUserEmail(location.state.loggedInUserEmail);
    setLoggedInUserPhone(location.state.loggedInUserPhone);
  }, [location]);

  // Handle updating user data
  const handleUpdate = async () => {
    const updatedData = {
      phone: loggedInUserPhone,
      name: loggedInUser,
      email: loggedInUserEmail
    };
  
    console.log('Sending data to backend:', updatedData);  // Log the data before sending
  
    try {
      const response = await fetch('http://localhost:8080/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
  
      const result = await response.json();
      console.log('Response from server:', result);  // Log the server response
  
      if (result.status === 'ok') {
        toast.success('User updated successfully!');

         // Update localStorage with new data after successful update
         localStorage.setItem('loggedInUserName', result.user.name);
         localStorage.setItem('loggedInUserEmail', result.user.email);
         localStorage.setItem('loggedInUserPhone', result.user.phone);
 
        
        setTimeout(() => {
          navigate('/Profile');
        }, 1000);
      } else {
        toast.error(result.message || 'Error updating user data');
      }
    } catch (err) {
      console.error('Error during update:', err);  // Log the full error
      toast.error('An error occurred while updating');
    }
  };
  
  return (
    <div className="update-container">
      <h2 className="update-title">Update Profile</h2>
      <div className="update-field">
        <label>Name:</label>
        <input
          placeholder="Name"
          value={loggedInUser}
          onChange={(e) => setLoggedInUser(e.target.value)}
        />
      </div>
      <div className="update-field">
        <label>Email:</label>
        <input
          placeholder="Email"
          value={loggedInUserEmail}
          onChange={(e) => setLoggedInUserEmail(e.target.value)}
        />
      </div>
      <div className="update-field">
        <label>Phone:</label>
        <input
          placeholder="Phone"
          value={loggedInUserPhone}
          disabled
        />
      </div>
      <button className="update-button" onClick={handleUpdate}>
        Update
      </button>
    

      <ToastContainer />
    </div>
  );
}

export default Update;
