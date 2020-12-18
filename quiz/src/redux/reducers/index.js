import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { authReducer } from "./authReducer";
import { questionReducer } from "./quizReducer";

const rootReducer = combineReducers({
  Auth: authReducer,
  loadingBar: loadingBarReducer,
  questionReducer,
});

export default rootReducer;
