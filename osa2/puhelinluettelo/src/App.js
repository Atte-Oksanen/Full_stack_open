import { useState, useEffect } from 'react'
import dbService from './components/dbService'

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
    dbService.getData().then(data => setPersons(data))
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumber = { ...persons.find(person => person.name.includes(newName)), number: newNumber }
        dbService.put(changedNumber).then(() => dbService.getData().then(data => setPersons(data)))
      }
    }
    else {
      const person = { name: newName, number: newNumber }
      dbService.create(person).then(newPerson => setPersons(persons.concat(newPerson)))
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      dbService.remove(person.id).then(() => dbService.getData().then(data => setPersons(data)))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar handler={handleSearch} />
      <h3>add a new</h3>
      <PersonForm nameHandler={handleNewName} numberHandler={handleNewNumber} personHandler={handleSetPersons} />
      <h2>Numbers</h2>
      {toShow.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>)}
    </div>
  )

}

export default App