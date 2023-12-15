/**
 * This code is the SiteObjectService which contains various functions for interacting with the site_objects.
 * These functions include getting all site_objects, getting a specific site_object, creating a site_object, updating a site_object, removing a site_object, and removing all site_objects.
 */
import axios from "axios";
import authHeader from "../auth/auth-header";
const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/site_object";

const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/by-id/${id}`, {headers: authHeader()});
};

const create = (data) => {
    console.log("create site_object service");
    console.log(data);
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    return axios.put(`${API_URL}/by-id/${id}`, data, {headers: authHeader()});
};

const remove = id => {
    return axios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
    return axios.delete(`${API_URL}`);
};

const SiteObjectService = {
  getAll,
  get,
  create,
  update,
  removeAll,
  remove
};

export default SiteObjectService;
