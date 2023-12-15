const mongoose = require("mongoose");

const Files = mongoose.model(
    "File",
    new mongoose.Schema({
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" }, // Reference to the "Site" model
        fileType: String, // Examples: "image", "document", "video", etc.
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the "User" model
        fileId: { type: mongoose.Schema.Types.ObjectId, ref: "GridFsFile" }, // Reference to your GridFS model
        status: String, // Status of the file
        filename: String, // Name of the file
        storage_location: String, // Location within the front-end folders
        createdAt: { type: Date, default: Date.now }, // Creation date of the file
        updatedAt: { type: Date, default: Date.now } // Last updated date of the file
    })
);

module.exports = Files;