import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addnewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: {
        id: JSON.parse(window.localStorage.getItem('blogUser')).id,
      },
    }
    setAuthor('')
    setTitle('')
    setUrl('')
    dispatch(addnewBlog(newBlog))
    dispatch(
      setNotification(
        { content: `Blog ${newBlog.title} has been created`, error: false },
        5000,
      ),
    )
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          id='title'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}></input>
        <br></br>
        Author:
        <input
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}></input>
        <br></br>
        URL:
        <input
          id='url'
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setUrl(target.value)}></input>
        <button id='submitForm' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}
export default BlogForm
