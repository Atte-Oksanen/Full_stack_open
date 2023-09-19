import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ handleMessage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const tempUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem('blogUser', JSON.stringify(tempUser))
      setUser(tempUser)
      setUsername('')
      setPassword('')
      blogService.setToken(tempUser.token)
    } catch (error) {
      handleMessage('Wrong username or password', true)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      username:
      <input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}></input>
      <br></br>
      password:
      <input id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}></input>
      <br></br>
      <button type='submit'>Log in</button>
    </form>
  )
}
export default LoginForm