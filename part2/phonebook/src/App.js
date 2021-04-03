import React, { useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons([...persons, { name: newName, phone: number }]);
    setNewName("");
    setNumber("");
  };

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h1>add new</h1>
      <PersonForm
        handleAdd={handleAdd}
        handleChange={handleChange}
        number={number}
        setNumber={setNumber}
        newName={newName}
      />

      <h2>Numbers</h2>
      <Persons filtered={filtered} />
    </div>
  );
};

export default App;
