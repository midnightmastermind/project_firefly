const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => mongoose.Types.ObjectId("65b7dc54cf74c369c84be2b3")
  },
  ID: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["variable"]
  },
  SKU: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  published: {
    type: Number,
    required: true
  },
  isFeatured: {
    type: Number,
    required: true
  },
  visibilityInCatalog: {
    type: String,
    required: true,
    enum: ["visible"]
  },
  shortDescription: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  inStock: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  backordersAllowed: {
    type: Number,
    required: true
  },
  soldIndividually: {
    type: Number,
    required: true
  },
  allowCustomerReviews: {
    type: Number,
    required: true
  },
  regularPrice: {
    type: Number,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  attribute1Name: {
    type: String,
    required: true
  },
  attribute1Values: {
    type: [String],
    required: true
  },
  attribute2Name: {
    type: String,
    required: true
  },
  attribute2Values: {
    type: [String],
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
