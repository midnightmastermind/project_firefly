const mongoose = require("mongoose");

const Form = mongoose.model(
    "Form",
    new mongoose.Schema({
        type: String,
        groupings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Grouping" }],
        content: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Form;