const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require("cors")
const Person = require("./models/phonebook")
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === "CastError")
    return res.status(400).send({ error: err.message })

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }
  res.status(500).send({ error: err.message })

  next()
}
morgan.token("body", function (req) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.get("/api/persons", (req, res, next) => {
  Person.find()
    .then((persons) => res.json(persons))
    .catch((err) => next(err))
})

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        next("Not found")
      }
    })
    .catch((err) => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(500).json({ error: "all fields required" })
  }
  const person = {
    name,
    number,
  }

  Person.findOneAndUpdate(id, person, { new: true, runValidators: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err))
})

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(500).json({ error: "all fields required" })
  }
  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((person) => res.json(person))
    .catch((err) => next(err))
})

app.get("/info", (req, res, next) => {
  Person.find()
    .then((persons) => {
      const info = `Phonebook has info for ${persons.length} people`
      return res.send(info + "\n" + Date())
    })
    .then((err) => next(err))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Magic is happening on PORT ${PORT}`))
