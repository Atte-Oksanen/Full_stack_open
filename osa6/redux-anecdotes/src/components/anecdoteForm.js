import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"

const AnectodeForm = () => {
  const dispatch = useDispatch()
  const handleAnecdoteForm = event => {
    event.preventDefault()
    dispatch(newAnecdote(event.target.anecdote.value))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteForm}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnectodeForm