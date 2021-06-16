import {
  CREATE_BLOG,
  GET_BLOGS,
  REMOVE_BLOG,
  LIKE_BLOG,
  ADD_COMMENT,
} from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { setNotification } from "./notificationAction";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const getBlogs = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      let blogs = await blogService.getAll();
      blogs = blogs.sort((a, b) => b.likes - a.likes);
      dispatch({
        type: GET_BLOGS,
        payload: blogs,
      });
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      dispatch(
        setNotification(
          { message: error.response?.data?.error, error: true },
          5000
        )
      );
    }
  };
};

export const createBlog = (blog, token) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newBlog = await blogService.addBlog(blog, token);
      dispatch({
        type: CREATE_BLOG,
        payload: newBlog,
      });
      dispatch(
        setNotification({
          message: `new blog ${newBlog.title} by ${newBlog.author} added`,
          error: false,
        })
      );
      dispatch(hideLoading());
    } catch (error) {
      dispatch(
        setNotification(
          { message: error.response?.data?.error, error: true },
          5000
        )
      );
      dispatch(hideLoading());
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { user, ...updatedBlog } = { ...blog, likes: ++blog.likes };
      await blogService.updateBlog(updatedBlog, user.token);
      dispatch({
        type: LIKE_BLOG,
        payload: blog,
      });
      dispatch(
        setNotification({
          message: `blog ${blog.title} by ${blog.author} updated`,
          error: false,
        })
      );
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      dispatch(
        setNotification({
          message: error.response?.data.error || error.response?.data,
          error: true,
        })
      );
    }
  };
};

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await blogService.deleteBlog(blog.id, token);
      dispatch({
        type: REMOVE_BLOG,
        payload: blog,
      });
      dispatch(hideLoading());
      dispatch(
        setNotification({
          message: `blog ${blog.title} by ${blog.author} removed`,
          error: false,
        })
      );
    } catch (error) {
      dispatch(hideLoading());

      dispatch(
        setNotification({
          message: error.response?.data?.error,
          error: true,
        })
      );
    }
  };
};

export const addComment = (blogId, comment, token) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const createdComment = await blogService.addComment(
        blogId,
        comment,
        token
      );
      dispatch({
        type: ADD_COMMENT,
        payload: createdComment,
      });
      dispatch(hideLoading());
      dispatch(
        setNotification({
          message: "comment added successfully",
          error: false,
        })
      );
    } catch (error) {
      dispatch(hideLoading());

      dispatch(
        setNotification({
          message: error.response?.data?.error,
          error: true,
        })
      );
    }
  };
};
