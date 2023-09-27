import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const index = state.findIndex(element => element.id === action.payload.id)
      const updatedState = JSON.parse(JSON.stringify(state))
      updatedState[index] = action.payload
      updatedState.sort((element1, element2) =>
        element1.likes < element2.likes
          ? 1
          : element1.likes > element2.likes
          ? -1
          : 0,
      )
      return updatedState
    },
    setBlogs(state, action) {
      action.payload.sort((element1, element2) =>
        element1.likes < element2.likes
          ? 1
          : element1.likes > element2.likes
          ? -1
          : 0,
      )
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const newState = state.filter(element => element.id !== action.payload.id)
      return newState
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    dispatch(setBlogs(await BlogService.getAll()))
  }
}

export const likePost = blog => {
  return async dispatch => {
    dispatch(addLike(await BlogService.putLike(blog)))
  }
}

export const addnewBlog = blog => {
  return async dispatch => {
    dispatch(appendBlog(await BlogService.createBlog(blog)))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    dispatch(deleteBlog(await BlogService.deleteBlog(blog)))
  }
}

export const { addLike, setBlogs, appendBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
