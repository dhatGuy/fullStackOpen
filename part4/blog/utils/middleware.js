const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError")
    return res.status(400).send({ error: "err.message" });

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).send({ error: err.message });
  next(err);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = { errorHandler, unknownEndpoint };
