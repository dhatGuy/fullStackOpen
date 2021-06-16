const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router
  .route("/")
  .get(async (req, res) => {
    const users = await User.find({}).populate("blogs");
    res.json(users);
  })
  .post(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      passwordHash,
    });
    const result = await newUser.save();

    res.status(201).json(result);
  });

router.route("/:id").get(async (req, res) => {
  const user = await User.findById(req.params.id).populate("blogs");
  if (user) {
    res.json(user.toJSON());
  } else {
    res.status(404).end();
  }
});

module.exports = router;
