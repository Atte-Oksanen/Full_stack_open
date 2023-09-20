import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newMessage(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(newMessage(message))
    setTimeout(() => {
      dispatch(newMessage(''))
    }, time * 1000)
  }
}
export const { newMessage } = notificationSlice.actions
export default notificationSlice.reducer