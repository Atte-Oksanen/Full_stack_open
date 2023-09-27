import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Blogform from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Togglable from "./components/togglable";

const App = () => {
  const [user, setUser] = useState(null);
  const [notifMessage, setMessage] = useState(null);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("blogUser");
    if (loggedUser) {
      const tempUser = JSON.parse(loggedUser);
      setUser(tempUser);
      blogService.setToken(tempUser.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blog1, blog2) =>
        blog1.likes < blog2.likes ? 1 : blog1.likes > blog2.likes ? -1 : 0,
      );
      setBlogs(blogs);
    });
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("blogUser");
    setUser("");
    handleMessage(`${user.name} logged out`, false);
  };
  
  const handleMessage = (message, error) => {
    setMessage(message);
    setError(error);
    setTimeout(() => {
      setMessage(null);
      setError(false);
    }, 3000);
  };

  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.createBlog(newBlog);
      handleMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        false,
      );
      setBlogs(blogs.concat(blog));
    } catch (error) {
      handleMessage("The blog could not be added");
    }
  };

  const handleLike = async (blog) => {
    await blogService.putLike(blog);
    const sortedBlogs = blogs.toSorted((blog1, blog2) =>
      blog1.likes < blog2.likes ? 1 : blog1.likes > blog2.likes ? -1 : 0,
    );
    setBlogs(sortedBlogs);
  };

  const handleBlogDelete = async (blogid) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogid));
    await blogService.deleteBlog(blogid);
  };

  return (
    <div>
      <Notification message={notifMessage} error={error}></Notification>
      {!user && (
        <LoginForm handleMessage={handleMessage} setUser={setUser}></LoginForm>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable
            buttonLabel1="New Blog"
            buttonLabel2="Cancel"
            ref={blogFormRef}
          >
            <Blogform handleNewBlog={handleNewBlog}></Blogform>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleBlogDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
