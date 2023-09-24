import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/requests"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      newAnecdote = { ...newAnecdote, votes: 0 }
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onMutate: newAnecdote => {
      if (newAnecdote.content.length < 5) {
        throw new Error(`Anecdote too short, must have lenght 5 or more`)
      }
    },
    onError: error => {
      dispatchNotification({ type: 'NOTIF', payload: error.message })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    dispatchNotification({ type: 'NOTIF', payload: `Created ${content}` })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
