import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queries";

export default function Recommend({ show }) {
  const { data: user } = useQuery(ME);
  const { data: books } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  const bookList = books.allBooks.filter((book) =>
    book.genres.includes(user.me.favoriteGenre)
  );
  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre: <b>{user.me.favoriteGenre}</b>{" "}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author?.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
