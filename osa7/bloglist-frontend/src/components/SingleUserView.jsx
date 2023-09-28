import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const SingleUserView = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      setUser((await userService.getById(id))[0])
    })()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className='p-3'>
      <h2 className='font-semibold text-2xl'>{user.name}</h2>
      <h3 className='font-semibold mt-2'>added blogs</h3>
      <ul className='list-inside list-disc'>
        {user.blogs.map(blog => (
          <li className='w-fit px-4' key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUserView
