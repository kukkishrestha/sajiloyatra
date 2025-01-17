const express = require('express');
const Booking = require('../Models/Booking');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const {
    userName,
    userEmail,
    carName,
    carModel,
    pricePerHour,
    startDateTime,
    endDateTime,
    totalPrice,
  } = req.body;

  try {
    // Check if the vehicle is already booked for the selected date range
    const existingBooking = await Booking.findOne({
      carName,
      $or: [
        {
          startDateTime: { $lt: endDateTime }, // Check if new start time is before any existing end time
          endDateTime: { $gt: startDateTime }, // Check if new end time is after any existing start time
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This vehicle is already booked for the selected time.' });
    }

    // If no overlap, proceed with saving the booking
    const newBooking = new Booking({
      userName,
      userEmail,
      carName,
      carModel,
      pricePerHour,
      startDateTime,
      endDateTime,
      totalPrice,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: savedBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking', error });
  }
});

// Check availability of the vehicle for a given time range
router.post('/check', async (req, res) => {
  const { carName, startDateTime, endDateTime } = req.body;

  try {
    // Find if any booking overlaps with the selected time range
    const existingBooking = await Booking.findOne({
      carName,
      $or: [
        {
          startDateTime: { $lt: endDateTime }, // Check if new start time is before any existing end time
          endDateTime: { $gt: startDateTime }, // Check if new end time is after any existing start time
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This vehicle is already booked for the selected time.' });
    }

    // If no overlap, the vehicle is available for booking
    res.status(200).json({ message: 'The vehicle is available for booking.' });
  } catch (error) {
    console.error('Error checking booking availability:', error);
    res.status(500).json({ message: 'Error checking booking availability.', error });
  }
});



// Fetch bookings for a specific user (by email)
router.get('/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  console.log("Fetching bookings for:", userEmail);  // Log the user email for debugging
  
  try {
    // Query the booking database by userEmail
    const bookings = await Booking.find({ userEmail }).exec();

    // Check if bookings were found
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }

    // Return bookings
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings for user:", error);
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
});



// DELETE Booking (Cancel a booking)
router.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;
  
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (deletedBooking) {
      return res.status(200).json({ message: 'Booking canceled successfully' });
    } else {
      return res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error canceling booking', error });
  }
});

module.exports = router;
