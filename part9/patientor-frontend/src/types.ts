export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  occupation?: string;
  type: Type;
}

export interface NewBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum Type {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface IHealthCheckEntry extends BaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface NewIHealthCheckEntry extends NewBaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface IOccupationalHealthcareEntry extends BaseEntry {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface IHospitalEntry extends BaseEntry {
  discharge: Discharge;
  type: Type.Hospital;
}

export interface NewIOccupationalHealthcareEntry extends NewBaseEntry {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface NewIHospitalEntry extends NewBaseEntry {
  discharge: Discharge;
  type: Type.Hospital;
}

export type Entry =
  | IHospitalEntry
  | IOccupationalHealthcareEntry
  | IHealthCheckEntry;

export type NewEntry =
  | NewIHospitalEntry
  | NewIOccupationalHealthcareEntry
  | NewIHealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
