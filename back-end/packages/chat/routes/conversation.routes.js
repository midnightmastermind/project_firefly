// routes/conversation.routes.js
const conversationController = require('../controllers/conversation.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/conversation', conversationController.createConversation);
  app.get('/api/conversation', conversationController.getConversations);
  app.get('/api/conversation/:id', conversationController.getConversationById);
  app.put('/api/conversation/:id', conversationController.updateConversation);
  app.delete('/api/conversation/:id', conversationController.deleteConversation);
  // Add other routes as needed
};
