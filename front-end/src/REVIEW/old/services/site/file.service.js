/**
 * This code is the FileService which contains various functions for interacting with the files.
 * These functions include getting all files, getting a specific file, creating a file, updating a file, removing a file, and removing all files.
 */
import axios from "axios";
import authHeader from "../auth/auth-header";
const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/file";

const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/by-id/${id}`, {headers: authHeader()});
};

const create = (data) => {
    console.log("create file service");
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

const FileService = {
  getAll,
  get,
  create,
  update,
  removeAll,
  remove
};

export default FileService;
