require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const verifyPassword =
    user !== null && (await bcrypt.compare(password, user.passwordHash));

  if (!(user && verifyPassword)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
    { expiresIn: "1hr" }
  );

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
