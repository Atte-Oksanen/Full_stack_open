import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogform from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'


const App = () => {
  const [user, setUser] = useState(null)
  const [notifMessage, setMessage] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogUser')
    if (loggedUser) {
      const tempUser = JSON.parse(loggedUser)
      setUser(tempUser)
      blogService.setToken(tempUser.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setUser('')
    handleMessage(`${user.name} logged out`, false)
  }

  const handleMessage = (message, error) => {
    setMessage(message)
    setError(error)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 3000)
  }

  return (
    <div>
      <Notification message={notifMessage} error={error}></Notification>
      {!user && <LoginForm handleMessage={handleMessage} setUser={setUser}></LoginForm>}
      {user && 
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
        <Blogform handleMessage={handleMessage}></Blogform>
      </div>
      }
    </div>
  )
}

export default App