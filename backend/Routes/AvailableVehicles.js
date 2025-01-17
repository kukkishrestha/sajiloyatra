const express = require("express");
const router = express.Router();
const Booking = require("./Models/Booking");
const VehicleModel = require("./Models/Vehicle");


router.post("/api/available-vehicles", async (req, res) => {
    const { startDateTime, endDateTime } = req.body;
  
    try {
      const overlappingBookings = await Booking.find({
        $or: [
          {
            startDateTime: { $lt: new Date(endDateTime) },
            endDateTime: { $gt: new Date(startDateTime) },
          },
          {
            startDateTime: { $gte: new Date(startDateTime) },
            endDateTime: { $lte: new Date(endDateTime) },
          },
        ],
      });
  
      const bookedCarNames = overlappingBookings.map((booking) => booking.carName);
  
      const availableVehicles = await VehicleModel.find({
        name: { $nin: bookedCarNames },
      });
  
      // Add image URL to each vehicle
      const vehiclesWithImageUrl = availableVehicles.map((vehicle) => ({
        ...vehicle.toObject(),
        imageUrl: `http://localhost:5000/uploads/${vehicle.image}`,
      }));
  
      res.json(vehiclesWithImageUrl);
    } catch (error) {
      console.error("Error fetching available vehicles:", error);
      res.status(500).json({ message: "Failed to fetch available vehicles", error });
    }
  });
  
module.exports = router;
