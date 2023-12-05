import express from "express"
import { v1 as uuid } from 'uuid'
const patientRouter = express.Router();
import patientService from "../services/patientService";
import cleanUpNewPatient from "../utils/cleanUpNewPatient";

patientRouter.get('/', (_req, res) => {
  res.json(patientService.getPatientsNoSSN())
})

patientRouter.post('/', (req, res) => {
  const patient = patientService.addPatient(cleanUpNewPatient.cleanUp({ ...req.body, id: uuid() }))
  res.json(patient)
})

export default patientRouter