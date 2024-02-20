// services/chat/chat_message.service.js
import axios from 'axios';
import authHeader from '../auth/auth-header';

const API_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_DOMAIN
    : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = '/api/chat_message';

const getAllChatMessages = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getChatMessage = (id) => {
  return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

const createChatMessage = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const updateChatMessage = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
};

const removeChatMessage = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const removeAllChatMessages = () => {
  return axios.delete(API_URL, { headers: authHeader() });
};

const ChatMessageService = {
  getAllChatMessages,
  getChatMessage,
  createChatMessage,
  updateChatMessage,
  removeChatMessage,
  removeAllChatMessages,
};

export default ChatMessageService;
