import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, loadingBarMiddleware()))
);

export default store;
