import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  const user = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRoYXRndXkiLCJpZCI6IjYwODk2MzZmMDdmZmE3MTBhMDFmNWJiNSIsImlhdCI6MTYyMDA3MzExNCwiZXhwIjoxNjIwMDc2NzE0fQ.nOnEkIA3z3MCgW9nFSZQ2v-B-CATmI66UDAzptQ-HDo",
    username: "dhatguy",
    name: "Odunsi",
  };
  const blog = {
    title: "Intro to typescript with React",
    author: "Joseph Odunsi",
    likes: 0,
    url: "https://www.dhatguycodes.com/blog",
    user: {
      blogs: ["6089a1b9437f38412476ca75"],
      name: "Odunsi",
      username: "dhatguy",
      id: "6089636f07ffa710a01f5bb5",
    },
  };

  test("should renders the blogs title and author, but does not render its url or number of likes by default", () => {
    const component = render(<Blog blog={blog} />);
    const div = component.container.querySelector(".blogDiv");

    expect(div).toHaveTextContent(
      "Intro to typescript with React by Joseph Odunsi"
    );
    expect(div).not.toHaveTextContent("https://www.dhatguycodes.com/blog");
    expect(div).not.toHaveTextContent("likes");
  });

  test("should check that the blogs url and number of likes are shown when the button controlling the shown details has been clicked", () => {
    const updateBlog = jest.fn();

    const component = render(
      <Blog blog={blog} updateBlog={updateBlog} user={user} />
    );

    const div = component.container.querySelector(".blogDiv");
    const viewBtn = component.getByText("view");

    userEvent.click(viewBtn);
    expect(
      screen.getByText("https://www.dhatguycodes.com/blog")
    ).toBeInTheDocument();
    expect(div).toHaveTextContent("likes");
  });

  test("should ensure that if the like button is clicked twice, the event handler the component received as props is called twice", () => {
    const updateBlog = jest.fn();
    render(<Blog blog={blog} updateBlog={updateBlog} user={user} />);
    const viewBtn = screen.getByText("view");
    userEvent.click(viewBtn);
    const likeBtn = screen.getByText("like");
    userEvent.dblClick(likeBtn);

    expect(updateBlog).toHaveBeenCalledTimes(2);
  });
});
