import React, { useState } from "react";
const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    marginTop: 5,
    border: "1px solid black",
  };

  return (
    <div style={blogStyle} className="blogDiv">
      <span>
        {blog.title} by {blog.author}
        <button onClick={() => setShow(!show)}>{show ? "hide" : "view"}</button>
      </span>
      {show && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={() => updateBlog(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          <button style={{ display: user.name === blog.user.name ? "" : "none" }} onClick={() => removeBlog(blog)}>
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
