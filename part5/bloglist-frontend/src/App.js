import React, { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const blogRef = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("bloglistUser", JSON.stringify(user));
      setMessage({ message: "Login successful", error: false });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setMessage({ message: e.response.data.error, error: true });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("bloglistUser");
    setUser(null);
  };

  const addBlog = async (blog) => {
    try {
      const res = await blogService.addBlog(blog, user.token);
      setBlogs([...blogs, res]);
      setMessage({
        message: `new blog ${res.title} by ${res.author} added`,
        error: false,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      blogRef.current.toggleVisibility();
    } catch (error) {
      setMessage({
        message: error.response.data.error || error.response?.data,
        error: true,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateBlog = (blog) => {
    const { user, ...updatedBlog } = { ...blog, likes: ++blog.likes };
    blogService
      .updateBlog(updatedBlog, user.token)
      .then((returnedBlog) => {
        setBlogs(
          blogs.map((blog) =>
            blog.id === returnedBlog.id ? returnedBlog : blog
          )
        );
        setMessage({
          message: `blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
          error: false,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((e) => {
        setMessage({
          message: e.response?.data.error || e.response?.data,
          error: true,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const removeBlog = async (blogToRemove) => {
    try {
      const result = window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
      );
      if (result) {
        await blogService.deleteBlog(blogToRemove.id, user.token);
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
        setMessage({
          message: `blog ${blogToRemove.title} by ${blogToRemove.author} removed`,
          error: false,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (error) {
      setMessage({
        message: error.response?.data,
        error: true,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      {user === null ? (
        <>
          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            username={username}
            password={password}
            setPassword={setPassword}
            message={message}
          />
        </>
      ) : (
        <div className="blog-app">
          <h2>blogs</h2>
          <Notification message={message} />
          <br />
          <div>
            <span>{user.name} logged in</span>{" "}
            <button onClick={logout}>logout</button>
          </div>
          <br />
          <Togglable ref={blogRef} buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div className="blogs">
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                user={user}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
