import { useApolloClient, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`${subscriptionData.data.bookAdded.title} added`);
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    },
  });
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {isLoggedIn ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                client.resetStore();
                setIsLoggedIn(false);
                setPage("login");
              }}
            >
              logout
            </button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors isLoggedIn={isLoggedIn} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook updateCacheWith={updateCacheWith} show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <LoginForm
        setIsLoggedIn={setIsLoggedIn}
        setPage={setPage}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
