import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: authReducer,
  loadingBar: loadingBarReducer,
  users: userReducer,
});
