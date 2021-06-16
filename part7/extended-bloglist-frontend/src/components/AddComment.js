import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../actions/blogAction";
import { Stack } from "@chakra-ui/react";

const AddComment = ({ blogId }) => {
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const submitComment = (e) => {
    e.preventDefault();
    dispatch(addComment(blogId, comment, token));
    setComment("");
  };
  return (
    <Box my="5">
      <form onSubmit={submitComment}>
        <Stack>
          <Input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="add your comment"
          />
          <Button
            type="submit"
            bg={"blue.700"}
            color="white"
            disabled={comment.trim().length <= 0}
          >
            add comment
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddComment;
