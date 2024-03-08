const mongoose = require("mongoose");

const ShopifyProduct = mongoose.model(
  "ShopifyProduct",
  new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    title: String,
    description: String,
    price: Number,
    // Add any other fields as needed
  })
);

module.exports = ShopifyProduct;
