const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    editable: {
      type: Boolean,
      required: true,
    },
    variation: {
      type: Boolean,
      required: true,
    },
    selection: {
      type: [String],
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  data: [
    {
      name: {
        type: mongoose.Schema.Types.Mixed,
      },
      // Add other dynamic fields as needed
    },
  ],
}, {
  collection: 'converted_products', // Specify the collection name
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Add timestamps
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
