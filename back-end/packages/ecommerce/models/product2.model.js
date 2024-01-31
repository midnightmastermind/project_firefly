const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => mongoose.Types.ObjectId("65b7dc54cf74c369c84be2b3")
  },
  id: {
    type: Number,
    required: true
  },
  product_type: {
    type: String,
    required: true,
    enum: ["variable"]
  },
  sku: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  is_published: {
    type: Number,
    required: true
  },
  is_featured: {
    type: Number,
    required: true
  },
  catalog_visibility: {
    type: String,
    required: true,
    enum: ["visible"]
  },
  short_description: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  is_in_stock: {
    type: Number,
    required: true
  },
  stock_quantity: {
    type: Number,
    required: true
  },
  allow_backorders: {
    type: Number,
    required: true
  },
  is_sold_individually: {
    type: Number,
    required: true
  },
  allow_customer_reviews: {
    type: Number,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_categories: {
    type: String,
    required: true
  },
  product_images: {
    type: String,
    required: true
  },
  attribute_1_name: {
    type: String,
    required: true
  },
  attribute_1_values: {
    type: [String],
    required: true
  },
  attribute_2_name: {
    type: String,
    required: true
  },
  attribute_2_values: {
    type: [String],
    required: true
  },
  product_weight: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
