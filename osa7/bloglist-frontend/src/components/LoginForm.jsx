import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      username:
      <input
        id='username'
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}></input>
      <br></br>
      password:
      <input
        id='password'
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}></input>
      <br></br>
      <button type='submit'>Log in</button>
    </form>
  )
}
export default LoginForm
