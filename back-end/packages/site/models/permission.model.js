// models/Permission.js
const mongoose = require("mongoose");

const Permission = mongoose.model(
  "Permission",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Permission;
