const mongoose = require("mongoose");

const Product_Permissions = mongoose.model(
    "Product_Permissions",
    new mongoose.Schema({
        notes: String,
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        permissions: String,
        status: String,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = Product_Permissions;