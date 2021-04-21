require("dotenv").config()
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const phonebookSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, unique: true },
  number: { type: Number, required: true, max: 8 },
})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Person", phonebookSchema)
