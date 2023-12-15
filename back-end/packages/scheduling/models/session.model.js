const mongoose = require("mongoose");

const Session = mongoose.model(
    "Session",
    new mongoose.Schema({
        title: String,
        notes: String,
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        active: Boolean,
        start: String,
        end: String,
        actual_start: Number,
        actual_end: Number,
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Session;