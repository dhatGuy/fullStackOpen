import {
  CLEAR_NOTIFICATION,
  SET_NOTIFICATION,
} from "../actions/notificationAction";

export default (state = "", { type, payload }) => {
  switch (type) {
    case SET_NOTIFICATION:
      return payload;
    case CLEAR_NOTIFICATION:
      return "";
    default:
      return state;
  }
};
