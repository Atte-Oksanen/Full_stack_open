import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likePost, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import commentService from '../services/comments'

const SingleBlogView = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const id = useParams().id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog.id === id)[0]

  useEffect(() => {
    if (blog) {
      ;(async () => {
        const comments = await commentService.getComments(blog.id)
        setComments(comments)
      })()
    }
  }, [blog])

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
      navigate('/')
    }
  }

  const toggleDelete = () => {
    if (user.id === blog.user || user.id === blog.user.id) {
      return (
        <button
          className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded'
          onClick={deleteBlog}>
          Remove
        </button>
      )
    }
    return null
  }

  const addComment = async event => {
    event.preventDefault()
    const response = await commentService.postComment(
      { content: comment },
      blog.id,
    )
    setComments(comments.concat(response))
  }

  if (!blogs || blogs.length < 1) {
    return null
  }

  return (
    <div className='p-3 leading-loose'>
      <h2 className='font-semibold'>
        {blog.title} by {blog.author}
      </h2>
      <div className='text-blue-600 hover:text-blue-700 visited:text-purple-700 underline'>
        {blog.url}
      </div>
      <div>
        {blog.likes} likes{' '}
        <button
          className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded'
          onClick={like}>
          Like
        </button>{' '}
      </div>
      <div>Added by {blog.user.name}</div>
      <div>{toggleDelete()}</div>
      <br />
      <h2 className='font-semibold'>Comments</h2>
      <form onSubmit={addComment}>
        <input
          className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          name='comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded'
          type='submit'>
          Add comment
        </button>
      </form>
      <ul>
        {comments.map(comment => (
          <li className='border w-fit px-3 my-1' key={comment.id}>
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SingleBlogView
