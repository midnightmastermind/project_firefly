/**
 * This is a service for interacting with the event API.
 * It contains methods for getting all events, getting a event by id, creating a new event, updating an existing event, and deleting a event.
 */
import axios from "axios";
import authHeader from "../auth/auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/event";

const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/${id}`, {headers: authHeader()});
};

const create = data => {
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {headers: authHeader()});
};

const remove = id => {
    return axios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
    return axios.delete(`${API_URL}`);
};

const EventService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default EventService;
