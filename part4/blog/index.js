const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const morgan = require("morgan")
const middleware = require("./utils/middleware")

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use("/api/blog", blogRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
