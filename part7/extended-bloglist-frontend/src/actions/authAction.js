import { showLoading, hideLoading } from "react-redux-loading-bar";
import { history } from "../history";
import { LOGIN, LOGOUT, SET_USER } from "../reducers/authReducer";
import loginService from "../services/login";
import { setNotification } from "./notificationAction";

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const user = await loginService.login({ username, password });
      dispatch({
        type: LOGIN,
        payload: user,
      });
      window.localStorage.setItem("bloglistUser", JSON.stringify(user));
      dispatch(setNotification({ message: "Login successful", error: false }));
      dispatch(hideLoading());
      history.push("/");
    } catch (error) {
      dispatch(hideLoading());
      dispatch(setNotification({ message: error.response.data, error: true }));
    }
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
