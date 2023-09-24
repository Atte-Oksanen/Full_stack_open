/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIF':
      return action.payload
    case 'ERROR':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
export default NotificationContext