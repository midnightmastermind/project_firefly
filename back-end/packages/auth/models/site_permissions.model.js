const mongoose = require("mongoose");

const Site_Permissions = mongoose.model(
    "Site_Permissions",
    new mongoose.Schema({
        roles: {type: mongoose.Schema.Types.ObjectId, ref: "Role"},
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
        status: String,
        created_at: { type: Number, default: Date.now }
    })
);

module.exports = Site_Permissions;