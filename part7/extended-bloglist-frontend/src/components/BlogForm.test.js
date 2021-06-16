import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import BlogForm from "./BlogForm";

test("should call the event handler it received as props with the right details when a new blog is created", () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);
  const authorInput = screen.getByLabelText("author");
  const titleInput = screen.getByLabelText("title");
  const urlInput = screen.getByLabelText("url");
  const create = screen.getByText("create");

  userEvent.type(authorInput, "Alex Devero");
  userEvent.type(titleInput, "React useEffect Hook Made Simple");
  userEvent.type(
    urlInput,
    "https://dev.to/alexdevero/react-useeffect-hook-made-simple-50ha"
  );
  userEvent.click(create);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "React useEffect Hook Made Simple"
  );
});
