import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
const Books = ({ show }) => {
  let [genre, setGenre] = useState(null)
  const books = useQuery(ALL_BOOKS, { variables: { genre: genre } }, { fetchPolicy: 'network-only' })
  const [genreSelection, setSelection] = useState(null)

  useEffect(() => {
    if (!books.loading) {
      const genreArray = books.data.allBooks.map(book => book.genres)
      const genres = new Set()
      for (let i = 0; i < genreArray.length; i++) {
        for (let y = 0; y < genreArray[i].length; y++)
          genres.add(genreArray[i][y])
      }
      setSelection(Array.from(genres))
    }
  }, [books])
  if (!show) {
    return null
  }
  if (books.loading || !genreSelection) {
    return null
  }

  const handleGenreChange = event => {
    setGenre(event.target.value)
  }
  return (
    <div>
      <h2>books</h2>
      {genreSelection.map(option => {
        return (
          <button key={option} type='radio' value={option} onClick={event => handleGenreChange(event)}>{option}</button>
        )
      })}
      <button onClick={() => setGenre('')}>Empty selection</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
