const mongoose = require("mongoose");

const Content = mongoose.model(
    "Content",
    new mongoose.Schema({
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
        primary_color: String,
        secondary_color: String,
        front_page_image: String,
        description: String,
        site_image: String,
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Content;