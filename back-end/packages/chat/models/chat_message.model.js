const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  content: String,
  direction: String,
  conversationId: String,
});

const ChatMessageModel = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessageModel;
