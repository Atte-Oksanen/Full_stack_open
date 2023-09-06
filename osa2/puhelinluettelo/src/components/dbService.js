import axios from "axios";
const baseUrl = 'api/persons'

const getData = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newDataPoint => {
    return axios.post('/api/persons/', newDataPoint).then(response => (response.data))
}

const remove = id => {
    return axios.delete(`/api/persons/${id}`).then(response => response.data)
}

const put = person => {
    return axios.put(`/api/persons/${person.id}`, person).then(response => response.data)
}

const exportFunctions = {
    getData,
    create,
    remove,
    put
}

export default exportFunctions