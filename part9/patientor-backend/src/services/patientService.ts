import patientData from "../../data/patients.json";
import { Patient } from "../../types";

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, occupation }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
  }));
};

export default { getPatients };
