import { gender, patient } from "../types";

const cleanUp = (newPatient: any): patient => {
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
  }
}

const isString = (input: any): input is string => {
  return typeof input === 'string' || input instanceof String
}

const isGender = (input: any): input is gender => {
  return Object.values(gender).map(value => value.toString()).includes(input)
}

export default { cleanUp }