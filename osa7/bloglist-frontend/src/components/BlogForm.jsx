import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addnewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { toggleVisibility } from '../reducers/togglableReducer'

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
    dispatch(toggleVisibility())
  }

  return (
    <div className='border-2 border-gray-400 w-fit p-4 m-3'>
      <h2 className='text-lg font-bold pb-1'>Create new</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='title'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}></input>
        <br></br>
        Author:
        <input
          className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}></input>
        <br></br>
        URL:
        <input
          className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='url'
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setUrl(target.value)}></input>
        <br />
        <button
          className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded mt-2'
          id='submitForm'
          type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}
export default BlogForm
