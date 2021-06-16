import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const addBlog = async (blog, token) => {
  const res = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const updateBlog = async (blog, token) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const deleteBlog = async (id, token) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const addComment = async (blogId, comment, token) => {
  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export default { getAll, addBlog, updateBlog, deleteBlog, addComment };
