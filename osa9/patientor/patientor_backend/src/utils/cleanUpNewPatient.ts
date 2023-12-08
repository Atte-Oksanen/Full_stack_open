import { Gender, Patient } from "../types";

const cleanUp = (newPatient: any): Patient => {
  if (!isString(newPatient.id) || !isString(newPatient.name)
    || !isString(newPatient.dateOfBirth) || !isString(newPatient.ssn)
    || !isGender(newPatient.gender) || !isString(newPatient.occupation)) {
    throw new Error
  }
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    ssn: newPatient.ssn,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
    entries: newPatient.entries
  }
}

const isString = (input: any): input is string => {
  return typeof input === 'string' || input instanceof String
}

const isGender = (input: any): input is Gender => {
  return Object.values(Gender).map(value => value.toString()).includes(input)
}

export default { cleanUp }