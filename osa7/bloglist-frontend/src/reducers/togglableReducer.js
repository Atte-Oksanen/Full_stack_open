import { createSlice } from '@reduxjs/toolkit'

const toggleSlice = createSlice({
  name: 'togglable',
  initialState: false,
  reducers: {
    toggleState(state, action) {
      return state ? false : true
    },
  },
})

export const toggleVisibility = () => {
  return dispatch => {
    dispatch(toggleState())
  }
}

export const { toggleState } = toggleSlice.actions
export default toggleSlice.reducer
