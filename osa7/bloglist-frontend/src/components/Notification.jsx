import { useSelector } from 'react-redux'

const Notification = ({ error }) => {
  const notif = useSelector(state => state.notification)
  if (notif === '') {
    return null
  }
  let style
  if (notif.error === false) {
    style = {
      color: 'Green',
      border: '1px solid black',
      backgroundColor: '#DADADA',
      fontSize: '18px',
    }
  } else {
    style = {
      color: 'Red',
      border: '1px solid black',
      backgroundColor: '#DADADA',
      fontSize: '18px',
    }
  }
  return <div style={style}>{notif.content}</div>
}

export default Notification
