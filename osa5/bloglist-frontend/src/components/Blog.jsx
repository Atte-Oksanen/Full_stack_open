/* eslint-disable react/prop-types */
import { useState } from 'react'
import Togglable from './togglable'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [likes, addLike] = useState(blog.likes)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const like = () => {
    blog.likes = likes + 1
    addLike(blog.likes)
    handleLike(blog)
  }

  const deleteBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  const toggleDelete = () => {
    if ((JSON.parse(window.localStorage.getItem('blogUser'))).id === blog.user || (JSON.parse(window.localStorage.getItem('blogUser'))).id === blog.user.id) {
      return (
        <button onClick={deleteBlog}>Remove</button>
      )
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
          {likes} <button onClick={like}>Like</button>
          <br></br>
          <br></br>
          {toggleDelete()}
        </div>
      </Togglable>
    </div>
  )
}


export default Blog