const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  favoriteGenre: {
    type: String,
  },
});

mongoose.plugin(validator);
module.exports = mongoose.model("User", schema);
