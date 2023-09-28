import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUser } from '../reducers/userReducer'
import loginService from '../services/login'

const LoginForm = ({ handleMessage }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const tempUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('blogUser', JSON.stringify(tempUser))
      dispatch(initializeUser(tempUser))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(
        setNotification(
          { content: `Wrong username or password`, error: true },
          5000,
        ),
      )
    }
  }
  return (
    <form className='bg-gray-300 w-fit p-3' onSubmit={handleLogin}>
      <h2 className='font-bold'>Login</h2>
      username:
      <input
        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='username'
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}></input>
      <br></br>
      password:
      <input
        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='password'
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}></input>
      <br></br>
      <button
        className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded mt-2'
        type='submit'>
        Log in
      </button>
    </form>
  )
}
export default LoginForm
