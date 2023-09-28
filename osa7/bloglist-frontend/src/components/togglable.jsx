import { useDispatch, useSelector } from 'react-redux'
import { toggleVisibility } from '../reducers/togglableReducer'

const Togglable = props => {
  const visible = useSelector(state => state.toggle)
  const dispatch = useDispatch()
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleVisibilityToggle = () => {
    console.log('here')

    dispatch(toggleVisibility())
  }

  return (
    <div className='my-2'>
      <div style={hideWhenVisible}>
        <button
          className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded'
          id={props.buttonLabel1}
          onClick={handleVisibilityToggle}>
          {props.buttonLabel1}
        </button>
      </div>
      <div style={showWhenVisible} className='togglable'>
        {props.children}
        <button
          className='bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded'
          onClick={handleVisibilityToggle}>
          {props.buttonLabel2}
        </button>
      </div>
    </div>
  )
}

export default Togglable
