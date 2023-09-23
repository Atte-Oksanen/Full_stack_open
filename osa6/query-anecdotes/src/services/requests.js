import axios from "axios"

export const getAnecdotes = async () => {
  return (await axios.get('http://localhost:3001/anecdotes')).data
}

export const createAnecdote = async anecdote => {
  return (await axios.post('http://localhost:3001/anecdotes', anecdote)).data
}

export const updateAnecdote = async anecdote => {
  return (await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)).data
}