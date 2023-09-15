import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async BlogObject => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, BlogObject, config)
    return response.data  
  } catch (error) {
    throw new Error('400')
  }
}


export default { getAll, createBlog, setToken}