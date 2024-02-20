// models/ChatMessage.js
const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    status: { type: Number, required: true },
    contentType: { type: Number, required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    createdTime: { type: String, required: true },
    conversationId: { type: String, required: true }
    // Add any other fields as needed
});

const ChatMessage = mongoose.model('Chat_Message', chatMessageSchema);

module.exports = ChatMessage;
