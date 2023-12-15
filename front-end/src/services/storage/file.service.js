/**
 * This code is the FileService which contains various functions for interacting with the files.
 * These functions include getting all files, getting a specific file, creating a file, updating a file, removing a file, and removing all files.
 */
import axios from "axios";
import authHeader from "../auth/auth-header";

const API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_DOMAIN
    : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/file";

const getAll = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(`${API_URL}/by-id/${id}`, { headers: authHeader() });
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
  return axios.delete(API_URL, { headers: authHeader() });
};

const getUploadProgress = (id) => {
  return axios.get(`/api/file/progress/${id}`, { headers: authHeader() });
};

const uploadFile = (folder_id, file, fileId, callbackFunction) => {
  console.log(folder_id);
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder_id", folder_id);

  return axios.post(`/api/file/upload`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: progress => {
      const { total, loaded } = progress;
      const totalSizeInMB = total / 1000000;
      const loadedSizeInMB = loaded / 1000000;
      const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
      

      callbackFunction(fileId, uploadPercentage.toFixed(2));
      // setUploadPercentage(uploadPercentage.toFixed(2));
      console.log(uploadPercentage.toFixed(2));

      console.log("total size in MB ==> ", totalSizeInMB);
      console.log("uploaded size in MB ==> ", loadedSizeInMB);
    },
  });
};

const FileService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getUploadProgress,
  uploadFile,
};

export default FileService;
