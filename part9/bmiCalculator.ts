// interface BmiValues {
//   value1: number;
//   value2: number;
// }

// const parseArguments = (args: Array<string>): BmiValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("Too many arguments");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const calculateBMI = (height: number, weight: number): string => {
  const bmiValue = (weight / height / height) * 10000;
  switch (true) {
    case bmiValue < 16.0:
      return "Severely underweight";
    case bmiValue < 18.5:
      return "Underweight";
    case bmiValue < 25.0:
      return "Normal";
    case bmiValue < 30.0:
      return "Overweight";
    case bmiValue < 35.0:
      return "Moderately Obese";
    case bmiValue < 40.0:
      return "Severely Obese";
    case bmiValue > 40.0:
      return "Morbidly Obese";
    default:
      throw new Error("Wrong inputs");
  }
};

// const a: number = Number(process.argv[2]);
// const b: number = Number(process.argv[3]);

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(calculateBMI(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
