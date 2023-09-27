import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
  },
})

export const initializeUser = user => {
  return dispatch => {
    dispatch(addUser(user))
  }
}

export const { addUser } = userSlice.actions
export default userSlice.reducer
