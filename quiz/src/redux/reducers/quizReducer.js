import produce from "immer";
import * as types from "../actions/actionType";

const initialState = {
  question: {
    data: [],
  },
};

const getQuestionReducer = (draft = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTION_REQUEST:
      break;
    case types.GET_QUESTION_SUCCESS:
      return {
        ...draft,
        question: {
          ...draft.question,
          data: action.payload,
        },
      };
    case types.GET_QUESTION_FAILURE:
      break;

    default:
      return draft;
  }
};

export const questionReducer = produce(getQuestionReducer);
