import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Stack } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../actions/blogAction";
import Togglable from "./Togglable";

const BlogForm = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blogRef = useRef(null);

  const addBlog = (e) => {
    e.preventDefault();
    dispatch(
      createBlog(
        {
          author,
          title,
          url,
        },
        user.token
      )
    );
    setTitle("");
    setAuthor("");
    setUrl("");
    blogRef.current.toggleVisibility();
  };
  return (
    <Togglable ref={blogRef} buttonLabel="new blog">
      <div className="formDiv">
        <form onSubmit={addBlog}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={4}
          >
            <Stack spacing={4}>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="author">
                <FormLabel>Author</FormLabel>
                <Input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </FormControl>
              <FormControl id="url">
                <FormLabel>URL</FormLabel>
                <Input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Create blog
              </Button>
            </Stack>
          </Box>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
