const mongoose = require("mongoose");

const Global_Permissions = mongoose.model(
    "Global_Permissions",
    new mongoose.Schema({
       roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Global_Permissions;