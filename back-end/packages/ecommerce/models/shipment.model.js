// models/Shipment.js
const mongoose = require("mongoose");

const Shipment = mongoose.model(
  "Shipment",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Shipment;
