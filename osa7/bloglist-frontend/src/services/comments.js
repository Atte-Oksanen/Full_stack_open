import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getComments = async id => {
  const response = await axios.get(`${baseUrl}/${id}/comment`)
  return response.data
}

const postComment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comment`, comment)
  return response.data
}

export default { getComments, postComment }
