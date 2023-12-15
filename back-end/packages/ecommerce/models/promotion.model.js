const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  description: String,
  expiresAt: Date,
  // Add more fields as needed
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
