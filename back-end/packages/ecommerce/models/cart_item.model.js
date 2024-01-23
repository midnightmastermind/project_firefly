const mongoose = require("mongoose");

const CartItems = mongoose.model(
    "Cart_Item",
    new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        type: String,
        quantity: Number,
        createdAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        updatedAt:  { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    })
);

module.exports = CartItems;