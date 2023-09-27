import { createSlice } from '@reduxjs/toolkit'
import { newMessage } from '../../../../osa6/redux-anecdotes/src/reducers/notificationReducer'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
  },
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(newNotification(message))
    setTimeout(() => {
      dispatch(newNotification(''))
    }, time)
  }
}

export const { newNotification } = notificationSlice.actions
export default notificationSlice.reducer
