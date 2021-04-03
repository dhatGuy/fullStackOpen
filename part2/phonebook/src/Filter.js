import React from 'react'

const Filter = ({search, setSearch}) => {
  return (
    <div>
      filter shown with
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="search"
      />
    </div>
  );
}

export default Filter
