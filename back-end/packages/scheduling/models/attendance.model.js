const mongoose = require("mongoose");

const Attendance = mongoose.model(
    "Attendance",
    new mongoose.Schema({
        notes: String,
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        session_id: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
        attendance_start: Number,
        attendance_end: Number,
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Attendance;