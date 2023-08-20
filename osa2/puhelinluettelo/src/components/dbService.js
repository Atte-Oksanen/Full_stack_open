import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getData = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newDataPoint => {
    return axios.post('http://localhost:3001/persons/', newDataPoint).then(response => (response.data))
}

const remove = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`).then(response => response.data)
}

const put = person => {
    return axios.put(`http://localhost:3001/persons/${person.id}`, person).then(response => response.data)
}

const exportFunctions = {
    getData,
    create,
    remove,
    put
}

export default exportFunctions