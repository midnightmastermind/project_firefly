// models/Service.js
const mongoose = require("mongoose");

const Service = mongoose.model(
  "Service",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Service;
