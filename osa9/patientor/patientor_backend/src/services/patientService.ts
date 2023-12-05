import patientData from "../data/patients";
import { patient } from "../types";
import cleanUpNewPatient from "../utils/cleanUpNewPatient";
const liveData = patientData


const getPatientsNoSSN = (): Omit<patient, 'ssn'>[] => {
  return liveData.map(patient => {
    return { ...cleanUpNewPatient.cleanUp(patient), ssn: undefined }
  })
}

const addPatient = (newPatient: patient): patient => {
  liveData.push(newPatient)
  return newPatient
}


export default { getPatientsNoSSN, addPatient }