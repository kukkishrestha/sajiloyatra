// models/Vehicle.js
const mongoose = require('mongoose');

// Define schema for the "vehicle" collection
const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Vehicle name
  car: { type: String, required: true },  // Car model
  rent: { type: Number, required: true }, // Rent per day
  image: { type: String, required: true }, // Path to uploaded image
  capacity: { type: Number, required: true }, // Seating capacity
  variant: { 
    type: String, 
    required: true, 
    enum: ['car', 'bike','scuter','evcar'], // Ensure status is either 'available' or 'unavailable'
    default: 'car' // Default to 'available' if not specified
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['available', 'unavailable'], // Ensure status is either 'available' or 'unavailable'
    default: 'available' // Default to 'available' if not specified
  },
  option: { 
    type: String, 
    required: true, 
    enum: ['selfdrive', 'withdriver'], // Ensure status is either 'available' or 'unavailable'
    default: 'selfdrive' // Default to 'available' if not specified
  }
});



// Create the "vehicle" model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
