import { ALL_AUTHORS, UPDATE_AGE } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, user }) => {
  const authors = useQuery(ALL_AUTHORS)
  const [choise, setChoise] = useState('')
  const [born, setBorn] = useState('')
  const [updateAge] = useMutation(UPDATE_AGE, { refetchQueries: [{ query: ALL_AUTHORS }] })
  if (!show) {
    return null
  }
  if (authors.loading) {
    return null
  }
  const options = authors.data.allAuthors.map((author) => {
    return { value: author.name, label: author.name }
  })

  const handleForm = async (event) => {
    event.preventDefault()
    updateAge({
      variables: { name: choise, setBornTo: Number(born) },
    })
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {user &&
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={handleForm}>
            name
            <Select options={options} onChange={(value) => setChoise(value.value)}></Select>
            born
            <input name='born' type='number' onChange={(event) => setBorn(event.target.value)}></input>
            <button type='submit'>update</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors
