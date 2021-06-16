import { Heading, Link, ListItem, UnorderedList } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BlogForm from "./BlogForm";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="blogs">
      <Heading size="lg">BLOGS</Heading>

      <BlogForm />
      <UnorderedList spacing={2}>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`} as={NavLink}>
              {blog.title}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
};

export default Blogs;
