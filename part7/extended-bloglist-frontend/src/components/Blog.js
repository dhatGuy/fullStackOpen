import React, { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { getBlogs, likeBlog } from "../actions/blogAction";
import AddComment from "./AddComment";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    if (!blogs.length) {
      dispatch(getBlogs());
    }
  }, []);

  if (!blogs.length) {
    return <Spinner />;
  }

  const updateBlog = (blog) => {
    dispatch(likeBlog(blog));
  };

  return (
    <Box className="blogDiv">
      <Heading size="md" py="5">
        {blog.title} by {blog.author}
      </Heading>
      <Box>
        <Link href={blog.url}>{blog.url}</Link>
        <p>
          likes {blog.likes}{" "}
          <Button onClick={() => updateBlog(blog)}>like</Button>
        </p>
        <p>added by {blog.user.name}</p>
      </Box>
      <Box>
        <Heading size="md">comments</Heading>
        <AddComment blogId={blog.id} />
        <UnorderedList>
          {!blog.comments.length ? (
            <Text>No comment yet</Text>
          ) : (
            blog.comments.map((comment) => (
              <ListItem key={comment.id}>{comment.content}</ListItem>
            ))
          )}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Blog;
