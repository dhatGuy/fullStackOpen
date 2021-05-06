import React from "react";
import Notification from "./Notification";

const LoginForm = ({
  handleLogin,
  setUsername,
  username,
  password,
  setPassword,
  message,
}) => {
  return (
    <div>
      <h1>Log in to blog list application</h1>
      <br />
      <Notification message={message} />
      <br/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
