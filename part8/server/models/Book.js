const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  published: {
    type: Number,
    minlength: 4,
    maxLength: 4,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

mongoose.plugin(validator);
module.exports = mongoose.model("Book", schema);
