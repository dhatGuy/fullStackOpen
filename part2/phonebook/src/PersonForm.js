import React from "react";

const PersonForm = ({
  handleAdd,
  newName,
  handleChange,
  number,
  setNumber,
}) => {
  return (
    <form onSubmit={handleAdd}>
      <h1>add new</h1>
      <div>
        name:{" "}
        <input value={newName} name="name" onChange={(e) => handleChange(e)} />
        <div>
          number:{" "}
          <input
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
