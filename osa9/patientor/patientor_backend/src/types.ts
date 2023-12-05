export interface diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: gender,
  occupation: string,
}

export enum gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}