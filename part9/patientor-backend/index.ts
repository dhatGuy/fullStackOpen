import cors from "cors";
import express from "express";
const app = express();
app.use(cors);
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
