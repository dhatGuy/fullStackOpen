/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export type NewPatient = Omit<Patient, "id" | "entries">;
