const ChatMessageModel = require('../models/chatMessageModel');

class ChatController {
  async sendMessage(req, res) {
    const { message, conversationId } = req.body;

    try {
      const chatMessage = new ChatMessageModel({
        content: message.content,
        direction: message.direction,
        conversationId,
      });

      await chatMessage.save();

      // Simulate sending a message
      // (you might need to import your chat service and modify this accordingly)
      // chatService.sendMessage({ message, conversationId });

      res.status(200).send('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement other CRUD operations as needed
}

module.exports = new ChatController();
