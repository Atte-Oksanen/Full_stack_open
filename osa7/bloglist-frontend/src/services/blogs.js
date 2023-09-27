import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const putLike = async (blogObject) => {
  await axios.put(`${baseUrl}/${blogObject.id}`, blogObject);
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default { getAll, createBlog, setToken, putLike, deleteBlog };
