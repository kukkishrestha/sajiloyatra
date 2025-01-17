// Load environment variables from .env file
require('dotenv').config();

const mongoose = require("mongoose");
const Vehicle = require("./Models/Vehicle");

// Fetch DB_URI from environment variables
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    const vehicles = await Vehicle.find();
    let updatedCount = 0;

    for (const vehicle of vehicles) {
      try {
        if (vehicle.image && typeof vehicle.image === "string" && !vehicle.image.startsWith("http")) {
          vehicle.image = `http://localhost:5000/uploads/${vehicle.image}`;
          await vehicle.save();
          updatedCount++;
        }
      } catch (err) {
        console.error(`Error updating vehicle with ID ${vehicle._id}:`, err);
      }
    }

    console.log(`${updatedCount} vehicles updated!`);
    mongoose.connection.close(() => {
      console.log("Connection closed");
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
