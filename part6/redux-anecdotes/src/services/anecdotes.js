import axios from "axios";

const baseUrl = "http://localhost:4000/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async(obj) => {
  const res = await axios.put(`${baseUrl}/${obj.id}`, obj)
  return res.data
};

export default { getAll, createNew, update };
