import { v4 as uuid } from "uuid";
import patientData from "../../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Omit<PublicPatient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  patient["entries"] = [];
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, getPatientById };
