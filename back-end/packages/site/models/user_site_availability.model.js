const mongoose = require("mongoose");

const User_Site_Availability = mongoose.model(
    "User_Site_Availability",
    new mongoose.Schema({
        availability: Boolean,
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = User_Site_Availability;