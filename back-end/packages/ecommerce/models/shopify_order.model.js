const mongoose = require("mongoose");

const ShopifyOrder = mongoose.model(
  "ShopifyOrder",
  new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customer: String,
    // Add any other fields as needed
  })
);

module.exports = ShopifyOrder;