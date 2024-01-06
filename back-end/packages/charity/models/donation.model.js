// models/Donation.js
const mongoose = require("mongoose");

const Donation = mongoose.model(
  "Donation",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Donation;
