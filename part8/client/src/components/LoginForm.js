import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setIsLoggedIn, setPage }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      if (data.login.value) {
        setError("");
        localStorage.setItem("auth-token", data.login.value);
        setIsLoggedIn(true);
        setPage("books");
      }
    },
  });

  if (!show) {
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ variables: { username: name, password: password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
