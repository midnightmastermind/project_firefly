/**
 * This is a service for interacting with the conversation API.
 * It contains methods for getting all conversations, getting a conversation by id,
 * creating a new conversation, updating an existing conversation, and deleting a conversation.
 */
import axios from 'axios';
import authHeader from '../auth/auth-header';

const API_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_DOMAIN
    : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = '/api/conversation';

const getAll = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

const create = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(`${API_URL}`, { headers: authHeader() });
};

const ConversationService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ConversationService;
