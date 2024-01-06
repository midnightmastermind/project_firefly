// models/Page.js
const mongoose = require("mongoose");

const Page = mongoose.model(
  "Page",
  new mongoose.Schema({
    name: String,
    route: String,
    layout: Array,
    style: Object,
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    status: Boolean
    // Add any other fields as needed
  },{ minimize: false })
);

module.exports = Page;
