import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/booking-form.css";

const BookingPage = () => {
  const location = useLocation();
  const { user, vehicle } = location.state;

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startDateTime && endDateTime && vehicle.rent) {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);
      const hours = (end - start) / (1000 * 60 * 60);

      if (hours > 0) {
        setTotalPrice(hours * vehicle.rent);
        setError(""); // Clear any error related to time selection
      } else {
        setTotalPrice(0);
        setError("Please select the correct date and time.");
      }
    }
  }, [startDateTime, endDateTime, vehicle.rent]);

  const validateTimeRange = () => {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const now = new Date(); // Get the current date and time

    // Check if the start time is in the past
    if (start < now) {
      setError("Start time cannot be in the past.");
      return false;
    }

    // Check if the end time is before the start time
    if (end <= start) {
      setError("End time must be after the start time.");
      return false;
    }

    // Check if booking is within allowed hours (5 AM to 11 PM)
    const startHour = start.getHours();
    const endHour = end.getHours();

    if (startHour < 5 || startHour > 23 || endHour < 5 || endHour > 23) {
      setError("Booking is only allowed between 5 AM and 11 PM.");
      return false;
    }

    setError(""); // Clear any previous error
    return true;
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/bookings/check", {
        carName: vehicle.name,
        startDateTime,
        endDateTime,
      });

      if (response.status === 200) {
        return true;
      } else {
        setError(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setError("This vehicle is already booked in the selected date and time.");
      return false;
    }
  };

  const handleBooking = async () => {
    if (!validateTimeRange()) return;

    const isAvailable = await checkAvailability();
    if (!isAvailable) return;

    try {
      const bookingData = {
        userName: user.name,
        userEmail: user.email,
        carName: vehicle.name,
        carModel: vehicle.car,
        pricePerHour: vehicle.rent,
        startDateTime,
        endDateTime,
        totalPrice,
      };

      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
      alert("Booking successful!");
      setError("");
    } catch (error) {
      console.error("Error booking the car:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="booking-form-container">
      <h1>Car Booking Form</h1>

      <div className="car-image-container">
        <img src={vehicle.imageUrl} alt={vehicle.name} className="car-image" />
      </div>

      <p><strong>Car Name:</strong> {vehicle.name}</p>
      <p><strong>Model:</strong> {vehicle.car}</p>
      <p><strong>Price per Hour:</strong> Rs {vehicle.rent}.00</p>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <label>Start Date and Time:</label>
      <input
        type="datetime-local"
        value={startDateTime}
        onChange={(e) => setStartDateTime(e.target.value)}
      />

      <label>End Date and Time:</label>
      <input
        type="datetime-local"
        value={endDateTime}
        onChange={(e) => setEndDateTime(e.target.value)}
      />

      {error && <div className="error-message">{error}</div>}

      <div className="total-price">
        {totalPrice > 0 ? `Total Price: Rs ${totalPrice}.00` : "Total Price: Rs 0.00"}
      </div>

      <button onClick={handleBooking}>Book</button>

      {/* Note Self Drive Vehicle Rental Criteria */}
      <div className="rental-criteria">
        <h3>Note Self Drive Vehicle Rental Criteria:</h3>
        <ul>
          <li>1. Self-drive booking confirmation takes place only after a physical meeting at Sajilo Rental Office at Narayangarh, Chitwan.</li>
          <li>2. Valid Driving License (minimum of 3 years old).</li>
          <li>3. Valid Passport Copy / Citizenship Copy of car renter and witness citizenship copy.</li>
          <li>4. Full payment in advance.</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingPage;
