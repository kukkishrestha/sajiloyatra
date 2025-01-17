const express = require("express");
const router = express.Router();
const Vehicle = require('../models/Vehicle'); // Import the Vehicle model
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); 

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single('image'); // Handle single image uploads

// POST: Add Vehicle (details.ejs)
router.post('/details', upload, async (req, res) => {
  try {
    // Create a new vehicle document with the added status field
    const vehicle = new Vehicle({
      name: req.body.name,
      car: req.body.car,
      rent: req.body.rent,
      capacity: req.body.capacity,
      variant:req.body.variant,
      status: req.body.status,
      option: req.body.option,  // Added status from form
      image: req.file.filename,
    });

    // Save the vehicle to the database
    await vehicle.save();

    // Redirect to the admin dashboard (index.ejs) to display updated data
    res.redirect('/index');
  } catch (err) {
    console.error('Error saving vehicle:', err);
    res.status(500).send('Error saving vehicle details');
  }
});

// GET: Admin Dashboard (index.ejs)
router.get('/index', async (req, res) => {
  try {
    // Fetch all vehicles from the database
    const vehicles = await Vehicle.find();

    // Render the dashboard and pass vehicle data
    res.render('index', {
      title: "Admin Dashboard",
      vehicles: vehicles, // Pass the vehicle data to the EJS view
    });
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).send('Error loading dashboard');
  }
});

// Render the Add Vehicle Form (details.ejs)
router.get('/details', (req, res) => {
  res.render('details', { title: "Add Vehicle Details" });
});

// Delete Vehicle Route
router.get('/delete/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }
    // Redirect to the index page after deletion
    res.redirect('/index');
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).send('Server error');
  }
});

// Edit Vehicle Route (GET)
router.get('/edit/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }
    res.render('edit_vehicle', { 
      title: "Edit Vehicle",  // Pass title to the view
      vehicle: vehicle 
    });
  } catch (error) {
    console.error('Error fetching vehicle for edit:', error);
    res.status(500).send('Server error');
  }
});

// Update Vehicle Route (POST)
router.post('/edit/:id', upload, async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        car: req.body.car,
        rent: req.body.rent,
        capacity: req.body.capacity,
        status: req.body.status, 
        option: req.body.option,  // Update the status as well
        // If a new image is uploaded, update the image field, otherwise keep the old one
        image: req.file ? req.file.filename : undefined,
      },
      { new: true } // This will return the updated document
    );

    if (!updatedVehicle) {
      return res.status(404).send('Vehicle not found');
    }

    // Redirect to the admin dashboard (index.ejs) after the update
    res.redirect('/index');
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).send('Server error');
  }
});
router.get('/add', async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1,phone: 1, password: 1 }); // Fetch name, email, and password
    res.render('add_users', { title: 'Add Users', users }); 
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});
router.get('/search', async (req, res) => {
  const query = req.query.query; // Get the search term from the query string
  try {
    // Search in both Vehicle and User collections
    const vehicleResults = await Vehicle.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { car: { $regex: query, $options: 'i' } },
        { variant: { $regex: query, $options: 'i' } },
      ],
    });

    const userResults = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });

    // Render a search results page
    res.render('search_results', {
      title: 'Search Results',
      vehicles: vehicleResults,
      users: userResults,
      query: query,
    });
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).send('An error occurred during the search');
  }
});

module.exports = router; 