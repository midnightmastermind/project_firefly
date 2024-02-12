// models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  type: { type: String, default: "post" },
  // parent_id: { type: mongoose.Schema.Types.ObjectId, default: null },
  title: { type: String, default: "Untitled Post" },
  content: { type: String, default: "" },
  post_image: { type: String, default: "" }, 
  // children: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  // status: { type: Boolean, default: false },
  //timestamp: { type: Date, default: Date.now },
  // author: { type: mongoose.Schema.Types.ObjectId, default: null},
  // Add any other fields as needed
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
