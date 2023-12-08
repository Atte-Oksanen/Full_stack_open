import patientData from "../data/patients";
import { Patient } from "../types";
import cleanUpNewPatient from "../utils/cleanUpNewPatient";
const liveData = patientData


const getPatientsNoSSN = (): Omit<Patient, 'ssn'>[] => {
  return liveData.map(patient => {
    return { ...cleanUpNewPatient.cleanUp(patient), ssn: undefined }
  })
}

const getPatientInfo = (id: string): Patient | undefined => {
  return cleanUpNewPatient.cleanUp(liveData.find(patient => patient.id === id))
}

const addPatient = (newPatient: Patient): Patient => {
  liveData.push(newPatient)
  return newPatient
}


export default { getPatientsNoSSN, addPatient, getPatientInfo }