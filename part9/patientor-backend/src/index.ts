import cors from "cors";
import express from "express";
import diagnosesRouter from "./routes/diagnose";
import patientsRouter from "./routes/patient";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnosis", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
