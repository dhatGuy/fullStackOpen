var router = require("express").Router();
var Blog = require("../models/blog");
var User = require("../models/user");

router.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;
