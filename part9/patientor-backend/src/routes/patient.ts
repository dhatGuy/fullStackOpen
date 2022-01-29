/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Router from "express";
import patientService from "../services/patientService";
import { EntryWithoutId } from "../types";
const router = Router();

router
  .route("/")
  .get((_req, res) => {
    res.send(patientService.getPatients());
  })
  .post((req, res) => {
    const { name, dateOfBirth, occupation, ssn, gender } = req.body;
    const newPatient = patientService.addPatient({
      name,
      dateOfBirth,
      occupation,
      ssn,
      gender,
    });
    res.json(newPatient);
  });

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatientById(id);
  res.json(patient);
});

router.route("/:id/entries").post((req, res) => {
  const entry: EntryWithoutId = req.body;
  const { id } = req.params;
  const patient = patientService.addEntry(id, entry);
  res.json(patient);
});

export default router;
