const mongoose = require("mongoose");

const Grouping = mongoose.model(
    "Grouping",
    new mongoose.Schema({
        type: String,
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
        content: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Grouping;