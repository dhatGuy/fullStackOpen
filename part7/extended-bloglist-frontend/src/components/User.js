import { Box, Heading, Link } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { ListItem, OrderedList, Spinner } from "@chakra-ui/react";
import { getUsers } from "../actions/userAction";
import { NavLink } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, []);

  if (!user) {
    return <Spinner />;
  }
  return (
    <Box>
      <Heading size="md">{user.name}</Heading>
      <Heading size="sm">Added Blogs</Heading>

      <OrderedList>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link as={NavLink} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
};

export default User;
