const mongoose = require("mongoose");

const Files = mongoose.model(
  "File",
  new mongoose.Schema({
    id: {
        type: String,
        default: function () {
            // If `id` is not provided, use the value of `_id`
            return this.id || this._id.toString();
        },
    },
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    type: String,
    name: String,
    size: Number,
    uploadProgress: Number,
    source: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    modDate: Date,
    parentId: String,
    isDir: Boolean,
    childrenIds: [String],
    childrenCount: Number,
  }).pre('save', function (next) {
    if (this.isNew && !this.uploadProgress) {
      this.uploadProgress = 0;
    }
    next();
  })
);

module.exports = Files;
