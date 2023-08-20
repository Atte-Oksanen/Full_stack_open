import { useState, useEffect } from 'react'
import countryInfo from './components/CountryApiService'
import getWeather from './components/weatherApiService'

const SearchBar = ({ handler }) => {
  return (
    <input onChange={handler}></input>
  )
}

const Weather = ({ temperature, wind, capital, icon }) => {
  return (
    <>
      <h2>Weather in {capital}</h2>
      <div>Temperature: {temperature} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=''></img>
      <div>Wind: {wind} m/s</div>
    </>
  )
}

const SearchResults = ({ countries, searchBar, handleShow, setTemp, temp, setWind, wind, weatherId, setId }) => {
  const toShow = countries.filter(country => {
    if (country.name.common.toLowerCase().includes(searchBar.toLowerCase()) ||
      country.name.official.toLowerCase().includes(searchBar.toLowerCase())) {
      return country.name.common
    }
    return null
  })
  if (toShow.length > 10) {
    return (
      <div>Too many results</div>
    )
  }
  if (toShow.length > 1) {
    return (
      <div>{toShow.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => handleShow(country)}>show</button></div>)}</div>
    )
  }
  if (toShow.length < 1) {
    return (
      <div>No results</div>
    )
  }

  const country = toShow[0]
  getWeather(country.latlng[0], country.latlng[1]).then(weather => {
    setTemp(weather.main.temp)
    setWind(weather.wind.speed)
    setId(weather.weather[0].icon)
  })
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt=''></img>
      <Weather capital={country.capital} temperature={temp} wind={wind} icon={weatherId} />
    </div>
  )
}


const App = () => {
  const [searchBar, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [temp, setTemp] = useState(null)
  const [wind, setWind] = useState(null)
  const [weatherId, setId] = useState(null)

  useEffect(() => {
    countryInfo.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  const handleShow = (country) => {
    setSearch(country.name.common)
  }
  return (
    <>
      <div>find countries</div>
      <SearchBar handler={handleSearch} />
      <SearchResults countries={countries} searchBar={searchBar} handleShow={handleShow}
        setTemp={setTemp} temp={temp} setWind={setWind} wind={wind} setId={setId} weatherId={weatherId} />
    </>
  );
}

export default App;
