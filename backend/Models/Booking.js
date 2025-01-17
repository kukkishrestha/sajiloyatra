const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  carName: { type: String, required: true },
  carModel: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  startDateTime: { type: String, required: true },
  endDateTime: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
