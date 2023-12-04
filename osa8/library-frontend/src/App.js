import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = ({ client }) => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)


  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => handleLogout()}>log out</button>

          </>
        }
        {!user && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Authors show={page === 'authors'} graphClient={client} user={user} />
      <Books show={page === 'books'} graphClient={client} />
      <NewBook show={page === 'add'} graphClient={client} />
      <Login show={page === 'login'} graphClient={client} user={user} setUser={setUser} setPage={setPage} />
      <Recommend show={page === 'recommend'} user={user} />
    </div>
  )
}

export default App
