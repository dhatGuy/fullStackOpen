import React from "react";

const Search = ({ query, setQuery }) => {
  return (
    <div>
      <label htmlFor="search">find countries</label>
      <input
        autoFocus
        type="search"
        name="search"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
