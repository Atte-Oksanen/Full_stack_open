import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div
      className='border border-gray-400 bg-gray-800 hover:bg-gray-400 rounded p-2 my-1 w-fit'
      id={blog.title}>
      <Link to={`blogs/${blog.id}`}>
        <span className=' p-2 text-white'>
          {blog.title} by {blog.author}
        </span>
      </Link>
    </div>
  )
}

export default Blog
