import React from "react";

const Persons = ({ filtered, onDelete }) => {
  return (
    <div>
      {filtered.map((person) => (
        <p key={person.name} {...person}>
          {person.name} {person.number}{" "}
          <button onClick={()=> onDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
