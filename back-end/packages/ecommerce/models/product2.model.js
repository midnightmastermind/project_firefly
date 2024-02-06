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
  type: {
    type: String,
    required: true,
    enum: ["variable", "variation"]
  },
  sku: {
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
  is_featured: {
    type: Number,
    required: true
  },
  visibility_in_catalog: {
    type: String,
    required: true,
    enum: ["visible"]
  },
  short_description: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_sale_price_starts: {
    type: String, // Change this to the appropriate type based on your actual data
    required: false
  },
  date_sale_price_ends: {
    type: String, // Change this to the appropriate type based on your actual data
    required: false
  },
  tax_status: {
    type: String,
    required: false
  },
  tax_class: {
    type: String,
    required: false
  },
  in_stock: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  backorders_allowed: {
    type: Number,
    required: true
  },
  sold_individually: {
    type: Number,
    required: true
  },
  weight_lbs: {
    type: Number,
    required: true
  },
  length_in: {
    type: Number,
    required: false
  },
  width_in: {
    type: Number,
    required: false
  },
  height_in: {
    type: Number,
    required: false
  },
  allow_customer_reviews: {
    type: Number,
    required: false
  },
  purchase_note: {
    type: String,
    required: false
  },
  sale_price: {
    type: Number,
    required: false
  },
  regular_price: {
    type: Number,
    required: false
  },
  categories: {
    type: String,
    required: false
  },
  tags: {
    type: String,
    required: false
  },
  shipping_class: {
    type: String,
    required: false
  },
  images: {
    type: [String],
    required: false
  },
  download_limit: {
    type: Number,
    required: false
  },
  download_expiry_days: {
    type: Number,
    required: false
  },
  parent: {
    type: String,
    required: false
  },
  grouped_products: {
    type: String,
    required: false
  },
  upsells: {
    type: String,
    required: false
  },
  cross_sells: {
    type: String,
    required: false
  },
  external_url: {
    type: String,
    required: false
  },
  button_text: {
    type: String,
    required: false
  },
  position: {
    type: Number,
    required: false
  },
  attribute_1_name: {
    type: String,
    required: false
  },
  attribute_1_values: {
    type: [String],
    required: false
  },
  attribute_2_name: {
    type: String,
    required: false
  },
  attribute_2_values: {
    type: [String],
    required: false
  },
  attribute_3_name: {
    type: String,
    required: false
  },
  attribute_3_values: {
    type: [String],
    required: false
  },
  attribute_4_name: {
    type: String,
    required: false
  },
  attribute_4_values: {
    type: [String],
    required: false
  },
  attribute_5_name: {
    type: String,
    required: false
  },
  attribute_5_values: {
    type: [String],
    required: false
  },
  meta_wpcom_is_markdown: {
    type: Boolean,
    required: false
  },
  download_1_name: {
    type: String,
    required: false
  },
  download_1_url: {
    type: String,
    required: false
  },
  download_2_name: {
    type: String,
    required: false
  },
  download_2_url: {
    type: String,
    required: false
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
