export const GET_BLOGS = "GET_BLOGS";
export const CREATE_BLOG = "CREATE_BLOG";
export const LIKE_BLOG = "LIKE_BLOG";
export const REMOVE_BLOG = "REMOVE_BLOG";
export const ADD_COMMENT = "ADD_COMMENT";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BLOGS:
      return payload;
    case CREATE_BLOG:
      return [...state, payload];
    case LIKE_BLOG: {
      return state.map((blog) => (blog.id === payload.id ? payload : blog));
    }
    case REMOVE_BLOG:
      return state.filter((blog) => blog.id !== payload.id);
    case ADD_COMMENT: {
      const newState = state.map((blog) =>
        blog.id === payload.blog
          ? { ...blog, comments: [...blog.comments, payload] }
          : blog
      );
      return newState;
    }
    default:
      return state;
  }
};
