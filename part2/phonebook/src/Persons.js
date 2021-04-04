import React from 'react'

const Persons = ({filtered}) => {
  return (
    <div>
      {filtered.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
}

export default Persons
