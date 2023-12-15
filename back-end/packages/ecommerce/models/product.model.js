const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  availability: Boolean,
  category: [], // e.g., 'Apparel',
  variants: [
    {
      attributes: [
        {
          name: String, // e.g., 'color'
          value: String, // e.g., 'red'
        },
        {
          name: String, // e.g., 'size'
          value: String, // e.g., 'medium'
        },
        {
          name: String, // e.g., 'image'
          value: String, // e.g., src of image
        },
      ],
      stock: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;