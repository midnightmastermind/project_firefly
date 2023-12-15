// services/chatService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your API endpoint

class ChatService {
  async sendMessage(message, conversationId) {
    try {
      await axios.post(`${API_BASE_URL}/sendMessage`, { message, conversationId });
      // Handle success (dispatch Redux action if needed)
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error
    }
  }

  // Implement other service methods for CRUD operations as needed
}

export default new ChatService();
