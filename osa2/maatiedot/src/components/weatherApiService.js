import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeather = (lat, lon) => {
    return axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(repsonse => repsonse.data)
}

export default getWeather