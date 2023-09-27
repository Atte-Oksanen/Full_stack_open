import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blogform from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogUser')
    if (loggedUser) {
      const tempUser = JSON.parse(loggedUser)
      dispatch(initializeUser(tempUser))
      blogService.setToken(tempUser.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    dispatch(initializeUser(null))
    dispatch(
      setNotification(
        { content: `User ${user.username} logged out`, error: false },
        5000,
      ),
    )
  }

  return (
    <div>
      <Notification></Notification>
      {!user && <LoginForm></LoginForm>}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable
            buttonLabel1='New Blog'
            buttonLabel2='Cancel'
            ref={blogFormRef}>
            <Blogform></Blogform>
          </Togglable>
          <h2>blogs</h2>
          <BlogList></BlogList>
        </div>
      )}
    </div>
  )
}

export default App
