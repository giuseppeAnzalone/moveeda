const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  ticketsBooked: {
    type: Number,
    required: true,
  },
});

module.exports =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
