import React, { useState, useEffect } from 'react';
import '../../styles/profile.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import '../../styles/update-button.css';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [loggedInUserPhone, setLoggedInUserPhone] = useState('');
  const [bookings, setBookings] = useState([]);  // To store user bookings

  useEffect(() => {
    // Getting the email, name, and phone from localStorage
    setLoggedInUser(localStorage.getItem('loggedInUserName'));
    setLoggedInUserEmail(localStorage.getItem('loggedInUserEmail'));
    setLoggedInUserPhone(localStorage.getItem('loggedInUserPhone'));
    
    // Fetch booking history for the logged-in user from the backend
    const fetchBookings = async () => {
      try {
        // Fetch bookings using the logged-in user's email
        const response = await axios.get(`http://localhost:8080/api/bookings/${localStorage.getItem('loggedInUserEmail')}`);
        setBookings(response.data);  // Update state with bookings data
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookings();  // Fetch bookings when the component mounts
  }, []);

  // Handle canceling the booking with confirmation
  const cancelBooking = async (bookingId) => {
    // Show confirmation dialog
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    
    if (confirmCancel) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`);
        if (response.status === 200) {
          // Remove the canceled booking from the UI
          setBookings(bookings.filter(booking => booking._id !== bookingId));
        }
      } catch (error) {
        console.error('Error canceling booking:', error);
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {loggedInUser}!</h1>
      <p>Email: {loggedInUserEmail}</p>
      <p>Phone: {loggedInUserPhone}</p>
      <button 
        className='update-button' 
        onClick={() => navigate("/Update", { state: { loggedInUser, loggedInUserEmail, loggedInUserPhone } })}>
        Update
      </button>

      {/* Display booking history */}
      <div className="booking-history">
        <h2>Your Booking History</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking, index) => (
              <li key={index}>
                <div className="booking-info">
                  <h3>Booked Vehicle</h3>
                  <p><strong>Car Name:</strong> {booking.carName}</p>
                  <p><strong>Car Model:</strong> {booking.carModel}</p>
                  <p><strong>Booking Dates:</strong> {new Date(booking.startDateTime).toLocaleString()} - {new Date(booking.endDateTime).toLocaleString()}</p>
                  <p><strong>Total Price:</strong> Rs{booking.totalPrice}</p>
                  {/* Cancel button */}
                  <button 
                    className="cancel-button" 
                    onClick={() => cancelBooking(booking._id)}>
                    Cancel Booking
                  </button>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
