const mongoose = require("mongoose");

const Question = mongoose.model(
    "Question",
    new mongoose.Schema({
        type: String,
        options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Option" }],
        content: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Question;