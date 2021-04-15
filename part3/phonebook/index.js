const express = require("express");
const morgan = require('morgan')
const app = express();
const PORT = 3001;

app.use(express.json())
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323",
    id: 7,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((person) => person.id === +id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Not found");
  }
});

app.delete("/api/persons/:id", (req,res)=>{
  const {id} = req.params
  persons = persons.filter(person=> person.id !== +id)
  res.status(204).end()
})

app.post("/api/persons", (req, res)=>{
  const {name, number} = req.body
  const id = Math.floor(Math.random() * 501) 
  const person = { name, number, id };
  persons = [...persons, person]
  if(!name || !number){
    return res.status(500).json({error: "all fields required"})
  }
  if(persons.some(person => person.name === name)){
    return res.status(500).json({error: `the name ${name} already exist`})
  }
  res.status(201).send(person)
})

app.get("/info", (req, res) => {
  const info = `Phonebook has info for ${persons.length} people`;
  res.send(info + "\n" + Date());
});

app.listen(PORT, () => console.log(`Magic is happening on PORT ${PORT}`));
