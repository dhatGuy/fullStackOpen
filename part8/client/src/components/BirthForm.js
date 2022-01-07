import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

export default function BirthForm() {
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const { data } = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("" || data?.allAuthors[0].name);
  const [year, setYear] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { input: { setBornTo: Number(year), name } } });

    setName("");
    setYear(0);
  };
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
            <option disabled>choose an author</option>
            {data?.allAuthors.map(({ name, id }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={year}
            type="number"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
}
