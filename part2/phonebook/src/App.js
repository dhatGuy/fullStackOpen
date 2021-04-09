import React, { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import phoneService from "./services/phonebook";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    phoneService
      .getAll()
      .then(({ data }) => setPersons(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number };

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const person = persons.find((n) => n.name === newPerson.name);
        const changedPerson = { ...person, number };

        phonebook.update(changedPerson).then(({ data }) => {
          setPersons(
            persons.map((person) => (person.id !== data.id ? person : data))
          );
          setNewName("");
          setNumber("");
        });
      }
      return;
    }
    phoneService.create(newPerson).then(() => {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNumber("");
    });
  };

  const handleDelete = (obj) => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      phoneService.remove(obj).then(() => {
        setPersons(persons.filter((person) => obj.id !== person.id));
      });
    }
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
      <Persons filtered={filtered} onDelete={handleDelete} />
    </div>
  );
};

export default App;
