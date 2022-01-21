/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dailyExerciseHoursNum: number[] = daily_exercises.map(
    (hours: number) => {
      const hoursNum = Number(hours);
      if (isNaN(hoursNum)) {
        res.status(400).send({ error: "malformation parameters" });
      }
      return hoursNum;
    }
  );
  const targetNum = Number(target);
  if (isNaN(targetNum)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  const result = calculateExercise(dailyExerciseHoursNum, targetNum);
  res.send(result);
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
