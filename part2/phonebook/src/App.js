import React, { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then(({data}) => setPersons(data)).catch(err=> console.log(err))
  },[])

  const handleAdd = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons([...persons, { name: newName, number, id: persons.length + 1 }]);
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
