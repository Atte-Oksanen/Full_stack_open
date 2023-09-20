import { createSlice } from "@reduxjs/toolkit"
import AnecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const index = state.findIndex(object => object.id === action.payload.id)
      const newState = JSON.parse(JSON.stringify(state))
      newState[index].votes = newState[index].votes + 1
      newState.sort((element1, element2) => (element1.votes < element2.votes) ? 1 : (element1.votes > element2.votes) ? -1 : 0)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    dispatch(setAnecdotes(await AnecdoteService.getAll()))
  }
}

export const createNew = content => {
  return async dispatch => {
    dispatch(appendAnecdote(await AnecdoteService.newAnecdote(content)))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    dispatch(addVote(await AnecdoteService.addVote(anecdote)))
  }
}

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer