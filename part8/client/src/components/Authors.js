import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_AUTHORS } from "../queries";
import BirthForm from "./BirthForm";

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.isLoggedIn && <BirthForm />}
    </div>
  );
};

export default Authors;
