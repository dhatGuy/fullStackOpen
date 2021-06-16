import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "./history";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <Router history={history}>
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
