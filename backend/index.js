const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config(); // Load environment variables

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const BookingRouter = require('./Routes/BookingRouter'); // Import Booking Router
const VehicleModel = require('./Models/Vehicle');
const UserModel = require('./Models/User');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Database Connection
require('./Models/db');

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Additional body parser for JSON
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads directory

// Routes
app.get('/ping', (req, res) => res.send('PONG')); // Ping route for testing

app.use('/auth', AuthRouter); // Authentication routes
app.use('/products', ProductRouter); // Product routes
app.use('/api/bookings', BookingRouter); // Booking routes

// Fetch bookings for a vehicle to check availability
app.get('/api/bookings/:carName', async (req, res) => {
  const { carName } = req.params;
  try {
    const bookings = await Booking.find({ carName });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
});


// Fetch All Vehicles
app.get('/getVehicles', async (req, res) => {
  try {
    const vehicles = await VehicleModel.find();
    const vehiclesWithImageUrl = vehicles.map(vehicle => ({
      ...vehicle.toObject(),
      imageUrl: `http://localhost:5000/uploads/${vehicle.image}`,
    }));
    console.log('Vehicles with Image URLs:', vehiclesWithImageUrl);
    res.json(vehiclesWithImageUrl);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch vehicles", error });
  }
});

// Fetch Vehicle by ID
app.get("/getVehicle/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await VehicleModel.findById(id);
    if (!vehicle) {
      return res.status(404).json({ status: "error", message: "Vehicle not found" });
    }

    const vehicleWithImageUrl = {
      ...vehicle.toObject(),
      imageUrl: `http://localhost:5000/uploads/${vehicle.image}`,
    };

    res.json(vehicleWithImageUrl);
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch vehicle details", error });
  }
});

// Update User
app.post("/updateUser", async (req, res) => {
  const { phone, name, email } = req.body;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { phone },
      { $set: { name, email } },
      { new: true }
    );

    if (updatedUser) {
      res.json({ status: 'ok', user: updatedUser, message: "User updated successfully!" });
    } else {
      res.status(404).json({ status: 'error', message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ status: 'error', message: 'An error occurred while updating', error });
  }
});

const Booking = require('./Models/Booking'); // Ensure you import the Booking model

// Check vehicle availability
app.post('/api/available-vehicles', async (req, res) => {
  const { journeyDate, startTime, endTime } = req.body;

  try {
    // Fetch all vehicles
    const vehicles = await VehicleModel.find();

    // Fetch all bookings for the provided time range
    const bookings = await Booking.find({
      startDateTime: { $lt: new Date(`${journeyDate}T${endTime}`) },
      endDateTime: { $gt: new Date(`${journeyDate}T${startTime}`) },
    });

    // Create a set of booked vehicle IDs
    const bookedVehicleIds = new Set(bookings.map((booking) => booking.carName));

    // Filter available vehicles
    const availableVehicles = vehicles.filter(
      (vehicle) => !bookedVehicleIds.has(vehicle.name)
    );

    // Add image URLs
    const vehiclesWithImageUrls = availableVehicles.map((vehicle) => ({
      ...vehicle.toObject(),
      imageUrl: `http://localhost:5000/uploads/${vehicle.image}`,
    }));

    res.status(200).json(vehiclesWithImageUrls);
  } catch (error) {
    console.error("Error fetching available vehicles:", error);
    res.status(500).json({ message: "Error fetching available vehicles" });
  }
});

// Fetch bookings for a specific user (by email)
app.get('/api/bookings/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  console.log("Fetching bookings for:", userEmail);  // Log the user email for debugging
  
  try {
    // Query the booking database by userEmail
    const bookings = await Booking.find({ userEmail }).exec();
s
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



// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8080`);
});
