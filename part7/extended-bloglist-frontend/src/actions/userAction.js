import { GET_USERS } from "../reducers/userReducer";
import userService from "../services/user";

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: GET_USERS,
      payload: users,
    });
  };
};
