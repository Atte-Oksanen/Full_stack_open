import { useState, useEffect } from "react";
import blogService from '../services/blogs'
import Blog from "./Blog";

const BlogForm = ({handleMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
      }, [blogs])
    
    const handleNewBlog = async event => {
        event.preventDefault()
        const newBlog = {
          title: title,
          author: author,
          url: url
        }
        try {
          await blogService.createBlog(newBlog)
          setAuthor('')
          setTitle('')
          setUrl('')
          handleMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, false)
        } catch (error) {
          handleMessage('The blog could not be added')
        }
      }
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleNewBlog}>
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
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}
export default BlogForm