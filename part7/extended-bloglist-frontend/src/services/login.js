import axios from "axios";
const baseURL = "/api/login";

const login = async (credential) => {
  const req = await axios.post(baseURL, credential);
  return req.data;
};

export default { login };
