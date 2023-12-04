import { useMutation } from "@apollo/client"
import { LOG_IN } from "../queries"
import { useState } from "react"

const Login = ({ show, setUser, setPage }) => {
  const [login] = useMutation(LOG_IN)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }
  const handleLogin = async event => {
    event.preventDefault()
    const user = await login({ variables: { username, password } })
    setUser(user.data.login.value)
    localStorage.setItem('user-token', user.data.login.value)
    setPage('authors')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        username
        <br />
        <input type="text" value={username} onChange={event => setUsername(event.target.value)}></input>
        <br />
        password
        <br />
        <input type="text" value={password} onChange={event => setPassword(event.target.value)}></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div >
  )
}

export default Login