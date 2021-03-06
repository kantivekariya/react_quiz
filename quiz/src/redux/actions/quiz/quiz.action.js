import axios from "axios";
import * as types from "../actionType";
import config from "../../../config/Config";

export function getAllQuestion() {
  return async (dispatch) => {
    dispatch({ type: types.GET_QUESTION_REQUEST });
    try {
      const res = await axios.get(`${config.BASE_URL}/quiz/question/`);
      dispatch({ type: types.GET_QUESTION_SUCCESS, payload: res });
      return res;
    } catch (error) {
      dispatch({ type: types.GET_QUESTION_FAILURE });
      return Promise.reject(error);
    }
  };
}

export function createQuiz(param) {
  return async (dispatch) => {
    dispatch({ type: types.ADD_QUESTION_REQUEST });
    try {
      const res = await axios.post(`${config.BASE_URL}/result/result`, param);
      dispatch({ type: types.ADD_QUESTION_SUCCESS, payload: res });
      return res;
    } catch (error) {
      dispatch({ type: types.ADD_QUESTION_FAILURE });
      return Promise.reject(error);
    }
  };
}
