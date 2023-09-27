/* eslint-disable react/prop-types */
import { useState } from 'react'
import Togglable from './togglable'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, likePost, removeBlog } from '../reducers/blogReducer'
import {
  newNotification,
  setNotification,
} from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const like = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likePost(updatedBlog))
    dispatch(
      setNotification(
        { content: `Blog ${blog.title} liked`, error: false },
        5000,
      ),
    )
  }

  const deleteBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      dispatch(
        setNotification(
          { content: `Blog ${blog.title} deleted`, error: false },
          5000,
        ),
      )
    }
  }

  const toggleDelete = () => {
    if (user.id === blog.user || user.id === blog.user.id) {
      return <button onClick={deleteBlog}>Remove</button>
    }
    return null
  }

  return (
    <div style={style} id={blog.title}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel1='View' buttonLabel2='Hide'>
        <div>
          {blog.url}
          <br></br>
          {blog.likes} <button onClick={like}>Like</button>
          <br></br>
          <br></br>
          {toggleDelete()}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
