require("dotenv").config();
const jwt = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (process.env.NODE_ENV !== "test") {
    console.log(err.message);
  }

  if (err.name === "CastError")
    return res.status(400).send({ error: err.message });

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }
  res.status(500).send({ error: err.message });
  next(err);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  const jwtToken = authorization?.substring(7);
  if (!jwtToken) {
    return res.sendStatus(401);
  }

  try {
    const token = jwt.verify(jwtToken, process.env.SECRET);
    req.token = token;
    req.user = token.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { errorHandler, unknownEndpoint, tokenExtractor };
