import { v4 as uuid } from "uuid";
import patientData from "../../data/patients";
import { NewPatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
