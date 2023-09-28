import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}

const getById = async id => {
  const response = (await axios.get(baseUrl)).data
  return response.filter(user => user.id === id)
}
export default { getAll, getById }
