export const SET_USER = "SET_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload;
    case LOGIN:
      return payload;
    case LOGOUT:
      window.localStorage.removeItem("bloglistUser");
      return null;
    default:
      return state;
  }
};
