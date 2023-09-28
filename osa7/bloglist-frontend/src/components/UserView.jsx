import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Userservice from '../services/users'
const UserView = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    ;(async () => {
      setUsers(await Userservice.getAll())
    })()
  }, [])
  return (
    <div className='p-3'>
      <h2 className='font-semibold text-lg'>Users</h2>
      <table className='mt-2'>
        <thead>
          <tr className='border'>
            <th>User</th>
            <th>Created blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr className='border' key={user.id}>
              <td className='px-4'>
                <Link
                  className='text-blue-600 underline hover:text-blue-800 visited:text-violet-700'
                  to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView
