import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS, GET_GENRES } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("ALL");
  const [books, setBooks] = useState([]);
  const [getBooks, { data, error }] = useLazyQuery(ALL_BOOKS);
  const { data: genreList } = useQuery(GET_GENRES);

  useEffect(() => {
    if (genre === "ALL") {
      getBooks();
    } else {
      getBooks({ variables: { genre } });
    }
    setBooks(data?.allBooks);
  }, [genre, getBooks, data]);

  if (!props.show) {
    return null;
  }

  if (error) console.log(error);

  const onSelectChange = (event) => {
    setGenre(event.target.value);
    // getBooks({ variables: { genre } });
  };

  return (
    <div>
      <h2>books</h2>
      <select
        value={genre}
        name="genreList"
        onChange={(e) => onSelectChange(e)}
      >
        <option value={"ALL"}>all genres</option>
        {genreList.allGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((book) => (
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
};

export default Books;
