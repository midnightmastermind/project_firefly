const mongoose = require("mongoose");

// Folders Schema
const Folders = mongoose.model(
    "Folder",
    new mongoose.Schema({
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" }, // Reference to the "Site" model
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String, // Name of the folder
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }], // Array of file references
        folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }], // Array of file references        
        createdAt: { type: Date, default: Date.now }, // Creation date of the folder
        updatedAt: { type: Date, default: Date.now } // Last updated date of the folder
    })
);


module.exports = Folders;