const mongoose = require("mongoose");

const Option = mongoose.model(
    "Option",
    new mongoose.Schema({
        type: String,
        content: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Option;