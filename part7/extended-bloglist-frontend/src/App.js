import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoadingBar from "react-redux-loading-bar";

import { useDispatch, useSelector } from "react-redux";
import { Container } from "@chakra-ui/layout";
import Nav from "./components/Nav";
import BlogList from "./components/BlogList";
import { getBlogs } from "./actions/blogAction";
import { setUser } from "./actions/authAction";
import { Redirect, Route, Switch } from "react-router";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import { history } from "./history";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <>
      <LoadingBar />
      <Nav />
      <Notification />
      <Container className="blog-app" mt="10">
        <Switch>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id">
            <User />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path={["/", "/blogs"]}>
            <BlogList />
          </Route>
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
