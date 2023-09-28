import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notification)
  if (notif === '') {
    return null
  }

  if (notif.error === false) {
    return (
      <div className='text-green-500 border border-black bg-gray-300 w-fit px-3 py-3 my-3'>
        {notif.content}
      </div>
    )
  }

  return (
    <div className='text-red-500 border border-black bg-gray-300 w-fit px-3 py-3 my-3'>
      {notif.content}
    </div>
  )
}

export default Notification
