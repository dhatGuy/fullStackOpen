interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const average =
    dailyExerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;
  const rating = average >= target ? 3 : average >= target * 0.8 ? 2 : 1;
  const ratingDescription =
    average >= target
      ? "good"
      : average >= target * 0.8
      ? "not too bad but could be better"
      : "bad";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
const dailyExerciseHours: number[] = process.argv.slice(2, -1).map((hr) => {
  if (isNaN(Number(hr))) {
    throw new Error("Provided values were not numbers!");
  }
  return Number(hr);
});

calculateExercise(
  dailyExerciseHours,
  Number(process.argv[process.argv.length - 1])
);
