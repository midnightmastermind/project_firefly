// controllers/booking.controller.js
const db = require("../../../models");
const Booking = db.booking;

// Create a new Booking
exports.createBooking = (req, res) => {
  const booking = new Booking({
    ...req.body
    // Add other fields as needed
  });

  booking.save((err, booking) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(booking);
  });
};

// Get all Bookings
exports.getBookings = (req, res) => {
  Booking.find()
    .exec((err, bookings) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!bookings) {
        return res.status(404).send({ message: "Bookings not found." });
      }

      res.status(200).send(bookings);
    });
};

// Get a specific Booking by ID
exports.getBooking = (req, res) => {
  Booking.findById(req.params.id)
    .exec((err, booking) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!booking) {
        return res.status(404).send({ message: "Booking not found." });
      }

      res.status(200).send(booking);
    });
};

// Update a Booking by ID
exports.updateBooking = (req, res) => {
  const bookingUpdates = {
    ...req.body
  };

  Booking.findOneAndUpdate({ _id: req.params.id }, bookingUpdates, { new: true })
    .exec((err, booking) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!booking) {
        return res.status(404).send({ message: "Booking not found." });
      }

      res.status(200).send(booking);
    });
};

// Delete a Booking by ID
exports.deleteBooking = (req, res) => {
  Booking.findOneAndDelete({ _id: req.params.id })
    .exec((err, booking) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!booking) {
        return res.status(404).send({ message: "Booking not found." });
      }

      res.status(200).send(booking);
    });
};
