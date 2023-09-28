import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './togglable'
const MainView = () => {
  return (
    <div>
      <div className='pl-2'>
        <Togglable buttonLabel1='New Blog' buttonLabel2='Cancel'>
          <BlogForm></BlogForm>
        </Togglable>
        <BlogList></BlogList>
      </div>
    </div>
  )
}

export default MainView
