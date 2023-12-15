// models/Theme.js
const mongoose = require("mongoose");

const Theme = mongoose.model(
  "Theme",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Theme;
