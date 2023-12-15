const mongoose = require("mongoose");

const Site = mongoose.model(
    "Site",
    new mongoose.Schema({
        title: String,
        domain: String,
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        folder_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    })
);

module.exports = Site;