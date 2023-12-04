import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommend = ({ user, show }) => {
  const profile = useQuery(ME)
  const books = useQuery(ALL_BOOKS, { variables: { genre: profile.loading ? '' : profile.data.me.favoriteGenre } }, { fetchPolicy: 'network-only' })
  if (!show || !user) {
    return null
  }
  if (profile.loading || books.loading) {
    return null
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favorite genre <b>{profile.data.me.favoriteGenre}</b></div>
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

export default Recommend