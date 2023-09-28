import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import MainView from './components/MainView'
import Notification from './components/Notification'
import SingleBlogView from './components/SingleBlogView'
import SingleUserView from './components/SingleUserView'
import UserView from './components/UserView'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
    <div className='font-serif'>
      <Router>
        <div className='bg-gray-700 py-3 pl-3'>
          <h2 className='text-3xl font-semibold text-white'>Blogs</h2>
          {!user && <LoginForm></LoginForm>}
          {user && (
            <div>
              <div className='pt-2 pb-2 w-fit'>
                <Link
                  to={'/'}
                  className=' p-2 text-white bg-gray-800  hover:bg-gray-400 rounded'>
                  blogs
                </Link>{' '}
                <Link
                  to={'/users'}
                  className=' p-2 text-white bg-gray-800  hover:bg-gray-400 rounded'>
                  users
                </Link>
                <br />
                <div className='text-white'>
                  {user.name} logged in{' '}
                  <button
                    onClick={handleLogout}
                    className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded'>
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='px-3'>
          <Notification></Notification>
        </div>
        <Routes>
          <Route path='/' element={user && <MainView></MainView>}></Route>
          <Route path='/users' element={user && <UserView></UserView>}></Route>
          <Route
            path='/users/:id'
            element={user && <SingleUserView></SingleUserView>}></Route>
          <Route
            path='/blogs/:id'
            element={user && <SingleBlogView></SingleBlogView>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
