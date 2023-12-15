const mongoose = require('mongoose');

const paymentInfoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cvv: { type: String, required: true },
  // Add more fields as needed
});

const PaymentInfo = mongoose.model('PaymentInfo', paymentInfoSchema);

module.exports = PaymentInfo;
