// models/Purchase.js
const mongoose = require("mongoose");

const Purchase = mongoose.model(
  "Purchase",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Purchase;
