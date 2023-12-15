// models/Style.js
const mongoose = require("mongoose");

const Style = mongoose.model(
  "Style",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Style;
