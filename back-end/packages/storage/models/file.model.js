const mongoose = require("mongoose");

// Files Schema
const Files = mongoose.model(
    "File",
    new mongoose.Schema({
        site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" }, // Reference to the "Site" model
        type: String,
        name: String,
        size: Number,
        uploadProgress: Number,
        source: String,
        createdAt: { type: Date, default: Date.now }, // Creation date of the file
        updatedAt: { type: Date, default: Date.now } // Last updated date of the file
    }).pre('save', function (next) {
        // Check if uploadProgress is not explicitly set (to allow manual updates)
        if (this.isNew && !this.uploadProgress) {
            this.uploadProgress = 0;
        }
        next();
    })
);

module.exports = Files;
