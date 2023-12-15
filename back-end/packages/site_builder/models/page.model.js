// models/Page.js
const mongoose = require("mongoose");

const Page = mongoose.model(
  "Page",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Page;
