const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  born: {
    type: Number,
  },
});

mongoose.plugin(validator);
module.exports = mongoose.model("Author", schema);
