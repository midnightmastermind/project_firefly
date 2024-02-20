// routes/chat_message.routes.js

// routes/chat_message.routes.js
const chatMessageController = require('../controllers/chat_message.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/chat_message', chatMessageController.createChatMessage);
  app.get('/api/chat_message', chatMessageController.getChatMessages);
  app.get('/api/chat_message/:id', chatMessageController.getChatMessageById);
  app.put('/api/chat_message/:id', chatMessageController.updateChatMessage);
  app.delete('/api/chat_message/:id', chatMessageController.deleteChatMessage);
  // Add other routes as needed
};
