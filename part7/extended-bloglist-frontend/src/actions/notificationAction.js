export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
let timerId;

export const setNotification = (msg, time = 5000) => {
  return async (dispatch) => {
    clearTimeout(timerId);
    dispatch({
      type: SET_NOTIFICATION,
      payload: msg,
    });
    timerId = setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIFICATION,
      });
    }, time);
  };
};
