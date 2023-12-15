// models/Navigation.js
const mongoose = require("mongoose");

const Navigation = mongoose.model(
  "Navigation",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Navigation;
