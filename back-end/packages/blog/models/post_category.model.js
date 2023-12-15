// models/PostCategory.js
const mongoose = require("mongoose");

const PostCategory = mongoose.model(
  "PostCategory",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = PostCategory;
