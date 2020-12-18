import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  Auth: authReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
