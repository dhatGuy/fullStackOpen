let timerId;
const notificationReducer = (state="", action) => {
  if(action.type === "NOTIFICATION"){
    return action.data
  }
  return state
}

export const setNotification = (content, time) => {
  return async (dispatch) => {
    clearTimeout(timerId)
    dispatch({
      type: "NOTIFICATION",
      data: content
    })

    timerId = setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        data: "",
      });
    }, time * 1000);
  }
}

export default notificationReducer;
