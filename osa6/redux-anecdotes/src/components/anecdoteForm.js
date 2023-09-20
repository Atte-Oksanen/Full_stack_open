import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnectodeForm = () => {
  const dispatch = useDispatch()

  const handleAnecdoteForm = async event => {
    event.preventDefault()
    dispatch(createNew(event.target.anecdote.value))
    dispatch(setNotification(`${event.target.anecdote.value} created`, 4))
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