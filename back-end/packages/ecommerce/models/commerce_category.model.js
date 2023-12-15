// models/CommerceCategory.js
const mongoose = require("mongoose");

const CommerceCategory = mongoose.model(
  "CommerceCategory",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = CommerceCategory;
