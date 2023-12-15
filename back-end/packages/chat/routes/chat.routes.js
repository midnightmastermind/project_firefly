const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post('/sendMessage', chatController.sendMessage);
// Implement other routes for CRUD operations as needed

module.exports = router;
