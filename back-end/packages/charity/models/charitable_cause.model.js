// models/CharitableCause.js
const mongoose = require("mongoose");

const CharitableCause = mongoose.model(
  "CharitableCause",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = CharitableCause;
