const mongoose = require("mongoose");

const Enrollment = mongoose.model(
    "Enrollment",
    new mongoose.Schema({
        enrolled: Boolean,
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Enrollment;