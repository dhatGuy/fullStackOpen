import React from 'react'

const Persons = ({filtered}) => {
  return (
    <div>
      {filtered.map(({ name, phone }) => (
        <p key={name}>
          {name} {phone}
        </p>
      ))}
    </div>
  );
}

export default Persons
