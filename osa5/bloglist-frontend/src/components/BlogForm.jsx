import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    setAuthor('')
    setTitle('')
    setUrl('')
    handleNewBlog(newBlog)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        Title:
        <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}></input>
        <br></br>
        Author:
        <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}></input>
        <br></br>
        URL:
        <input type='text' value={url} name='URL' onChange={({ target }) => setUrl(target.value)}></input>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
export default BlogForm