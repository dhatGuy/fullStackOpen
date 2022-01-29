import { v4 as uuid } from "uuid";
import patientData from "../../data/patients";
import {
  EntryWithoutId,
  NewPatient,
  Patient,
  PublicPatient,
  Type,
} from "../types";

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

const addEntry = (patientId: string, entry: EntryWithoutId): Patient => {
  const patient = getPatientById(patientId);

  if (!patient) throw new Error(`Patient with id ${patientId} not found`);
  if (!entry.type) throw new Error("Type missing");
  if (!Object.keys(Type).includes(entry.type))
    throw new Error("Invalid entry type");
  if (entry.type === Type.HealthCheck && entry.healthCheckRating == undefined) {
    throw new Error("Missing property healthCheckRating");
  }
  if (entry.type === Type.Hospital && !entry.discharge)
    throw new Error("Missing property discharge");
  if (entry.type === Type.OccupationalHealthcare && !entry.employerName)
    throw new Error("Missing property employerName");

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return patient;
};

export default { getPatients, addPatient, getPatientById, addEntry };
