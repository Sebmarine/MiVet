import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const addExternalLink = (payload) => {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/externallinks`,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateExternalLink = (payload) => {
  const config = {
    method: "PUT",
    url: `${API_HOST_PREFIX}/api/externallinks/${payload.parentId}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteExternalLink = (id) => {
  const config = {
    method: "DELETE",
    url: `${API_HOST_PREFIX}/api/externallinks/${id}`,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getExternalLink = () => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/externallinks`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const externalLinkService = {
  addExternalLink,
  updateExternalLink,
  getExternalLink,
  deleteExternalLink,
};

export default externalLinkService;
