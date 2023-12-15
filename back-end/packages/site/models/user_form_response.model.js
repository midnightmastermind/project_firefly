const mongoose = require("mongoose");

const UserFormResponse = mongoose.model(
    "UserFormResponse",
    new mongoose.Schema({
        form_id: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        option_id: { type: mongoose.Schema.Types.ObjectId, ref: "Option" },
        response: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = UserFormResponse;