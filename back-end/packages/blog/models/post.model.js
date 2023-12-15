// models/Post.js
const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
    // Add any other fields as needed
  })
);

module.exports = Post;
