import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchBar = ({ handler }) => {
  return (
    <div>
      filter shown with <input onChange={handler}></input>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.personHandler}>
        name: <input onChange={props.nameHandler} />
        <br></br>
        <br></br>
        number: <input onChange={props.numberHandler} />
        <br></br>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchBar, setSearch] = useState('')

  const toShow = persons.filter(person => person.name.toLowerCase().includes(searchBar.toLowerCase()))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSetPersons = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar handler={handleSearch} />
      <h3>add a new</h3>
      <PersonForm nameHandler={handleNewName} numberHandler={handleNewNumber} personHandler={handleSetPersons} />
      <h2>Numbers</h2>
      {toShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )

}

export default App