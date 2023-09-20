import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const filteredAnecdotes = anecdotes.filter(element => element.content.toLowerCase().includes(filter.toLowerCase()))

  const handleLike = async event => {
    const anecdote = JSON.parse(event.target.value)
    anecdote.votes = anecdote.votes + 1
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button value={JSON.stringify(anecdote)} onClick={handleLike}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList