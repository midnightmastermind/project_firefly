// // messagesController.js
// const express = require('express');
// const router = express.Router();

// // Assuming you have your Conversation model defined
// const Conversation = require('../models/chat_message');

// // Route to handle incoming chat messages
// router.post('/', async (req, res) => {
//   try {
//     const { chat_messageId, sender, content } = req.body;

//     // Update or create the chat_message based on the chat_messageId
//     let chat_message;
//     if (chat_messageId) {
//       chat_message = await Conversation.findByIdAndUpdate(
//         chat_messageId,
//         { $push: { messages: { sender, content } } },
//         { new: true }
//       );
//     } else {
//       chat_message = await Conversation.create({
//         participants: [sender], // You may need to adjust this based on your authentication logic
//         messages: [{ sender, content }],
//       });
//     }

//     // Send appropriate response, possibly with the updated chat_message
//     res.json({ success: true, chat_message });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;
// controllers/chat/chat_message.controller.js
const ChatMessage = require('../models/chat_message.model');

exports.createChatMessage = async (req, res) => {
  try {
    const { chat_messageId, sender, content } = req.body;

    // Update or create the chat_message based on the chat_messageId
    let chat_message;
    if (chat_messageId) {
      chat_message = await ChatMessage.findByIdAndUpdate(
        chat_messageId,
        { $push: { messages: { sender, content } } },
        { new: true }
      );
    } else {
      chat_message = await ChatMessage.create({
        participants: [sender], // You may need to adjust this based on your authentication logic
        messages: [{ sender, content }],
      });
    }

    // Send appropriate response, possibly with the updated chat_message
    res.json({ success: true, chat_message });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getChatMessages = async (req, res) => {
  // Implement logic to retrieve chat messages
};

exports.getChatMessageById = async (req, res) => {
  // Implement logic to retrieve a specific chat message by ID
};

exports.updateChatMessage = async (req, res) => {
  // Implement logic to update a specific chat message
};

exports.deleteChatMessage = async (req, res) => {
  // Implement logic to delete a specific chat message
};

