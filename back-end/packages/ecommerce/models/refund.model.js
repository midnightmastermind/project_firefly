const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  reason: { type: String, required: true },
  // Add more fields as needed
}, { timestamps: true });

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;