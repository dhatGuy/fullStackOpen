import React, { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import phoneService from "./services/phonebook";
import phonebook from "./services/phonebook";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
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
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const person = persons.find((n) => n.name === newPerson.name);
        const changedPerson = { ...person, number };

        phonebook
          .update(changedPerson)
          .then(({ data }) => {
            setPersons(
              persons.map((person) => (person.id !== data.id ? person : data))
            );
            setError(false);
            setMessage(`Edited ${data.name}`);

            setTimeout(() => {
              setMessage(null);
            }, 5000);

            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
      return;
    }
    phoneService.create(newPerson).then(({ data }) => {
      setError(false);
      setMessage(`Added ${data.name}`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);

      setPersons([...persons, data]);
      setNewName("");
      setNumber("");
    });
  };

  const handleDelete = (obj) => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      phoneService
        .remove(obj)
        .then(() => {
          setError(false);
          const deletedPerson = persons.filter(
            (person) => obj.id === person.id
          )[0];
          setPersons(persons.filter((person) => obj.id !== person.id));
          setMessage(`Deleted ${deletedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 4000);
        })
        .catch(({ response }) => {
          if (response.statusText === "Not Found") {
            setError(true);
            setMessage(`Information of ${obj.name} has been removed from server already!`);
            setTimeout(() => {
              setMessage(null);
            }, 4000);
          }
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
      <Notification message={message} error={error} />
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
