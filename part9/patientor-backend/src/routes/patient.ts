/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Router from "express";
import patientService from "../services/patientService";
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

export default router;
