const mongoose = require('mongoose');

// Conversation model
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
  }],
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
