// models/Variation.js
const mongoose = require("mongoose");

const Variation = mongoose.model(
  "Variation",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Variation;
