import axios from "axios";
import { notification } from "antd";
import { getLocalState } from "./localStorage";
import config from "../config/Config";
import { errorFormater } from "./helper";

export function setupAxios() {
  axios.defaults.baseURL = config.BASE_URL;
  axios.defaults.timeout = config.TIMEOUT;
  const access_token = getLocalState("access_token");
  console.log('access_token', access_token)
  if (access_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    axios.defaults.headers.common["X-Requested-With"] = `XMLHttpRequest`;
  }
  axios.interceptors.request.use(onRequestSuccess, onRequestError);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

const onRequestSuccess = response => {
  return response;
};

const onRequestError = error => {
  return Promise.reject(error);
};

const onResponseSuccess = response => {
  console.log('response', response)
  if (response) {
    if (response.headers && response.headers["x-total-count"]) {
      return {
        data: response.data,
        total: parseInt(response.headers["x-total-count"]),
        per_page: 10,
        current_page:
          response.config.params && response.config.params["__page"]
            ? response.config.params["__page"]
            : 1
      };
    } else {
      return response.data;
    }
  }
  return response;
};

const onResponseError = error => {
  // Do something with response error
  if (error.response && error.response.status === 401) {
    notification.error(errorFormater(error.response.data, 10));
    localStorage.clear();
  }
  if (error.response && error.response.status === 422) {
    notification.error(errorFormater(error.response.data, 10));
  }
  return Promise.reject(error);
};
