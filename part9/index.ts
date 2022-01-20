import express from "express";
import { calculateBMI } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBMI(heightNum, weightNum);
  res.send({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
