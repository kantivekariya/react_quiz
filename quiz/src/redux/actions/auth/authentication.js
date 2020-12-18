import axios from "axios";
import jwt_decode from "jwt-decode";
import * as types from "../actionType";
import config from "../../../config/Config";
import { getLocalState, setLocalState } from "../../../utils/localStorage";

// SignUp
export function userSignup(params) {
  return async (dispatch) => {
    dispatch({ type: types.AUTH_SIGNUP_REQUEST });
    try {
      const res = await axios.post(`${config.BASE_URL}/auth/register`, params);
      dispatch({ type: types.AUTH_SIGNUP_SUCCESS, payload: res });
      return res;
    } catch (error) {
      dispatch({ type: types.AUTH_SIGNUP_FAILURE });
      return Promise.reject(error);
    }
  };
}

// Login
export function userLogin(params) {
  return async (dispatch) => {
    dispatch({ type: types.AUTH_LOGIN_REQUEST });
    try {
      const res = await axios.post(`${config.BASE_URL}/auth/login`, params);
      console.log("decoded", res)
      const decoded = jwt_decode(res.token);
      console.log("decoded", decoded)
      saveTokens({ access_token: res.token, expires_in: decoded.exp });
      dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: decoded });
      return res;
    } catch (error) {
      dispatch({ type: types.AUTH_LOGIN_FAILURE });
      return Promise.reject(error);
    }
  };
}

export function userLogout() {
  return async (dispatch) => {
    dispatch({ type: types.AUTH_LOOUT_REQUEST });
    try {
      const res = await axios.get(`${config.BASE_URL}/auth/logout`);
      dispatch({ type: types.AUTH_LOOUT_SUCCESS, payload: res });
      localStorage.clear();
      return res;
    } catch (error) {
      dispatch({ type: types.AUTH_LOOUT_FAILURE });
      return Promise.reject(error);
    }
  };
}

export function getUserProfile() {
  return async (dispatch) => {
    dispatch({ type: types.AUTH_ME_REQUEST });
    try {
      const res = await axios.get(`${config.BASE_URL}/auth/me`);
      console.log("me",res)
      dispatch({ type: types.AUTH_ME_SUCCESS, payload: res });
      return res;
    } catch (error) {
      dispatch({ type: types.AUTH_ME_FAILURE });
      return Promise.reject(error);
    }
  };
}

export function saveTokens(params) {
  const { access_token, expires_in } = params;
  const expires_at = new Date();
  expires_at.setSeconds(expires_at.getSeconds() + expires_in);
  setLocalState("expires_in", expires_in);
  setLocalState("expires_at", expires_at.getTime());
  setLocalState("access_token", access_token);
}

export function onLocalLogin() {
  return (dispatch, getState) => {
    const _expiresAt = getLocalState("expires_at");
    const access_token = getLocalState("access_token");
    if (_expiresAt && access_token && new Date().getTime() < _expiresAt) {
      // authorize
      console.log("onLocalLogin - authorize");
      return dispatch(getUserProfile());
    } else {
      //unauth
      console.log("onLocalLogin - unauth");
      localStorage.clear();
    }
  };
}
