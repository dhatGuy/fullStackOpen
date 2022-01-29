import diagnoseData from "../../data/diagnoses.json";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};
