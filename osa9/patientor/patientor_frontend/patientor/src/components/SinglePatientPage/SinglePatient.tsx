import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useEffect, useState } from "react";
import patients from "../../services/patients";

const SinglePatient = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        setPatient(await patients.getPatient(id));
      }
    };
    fetchPatient();
  }, [id]);
  if (!patient) {
    return null;
  }
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>
        Gender: {patient.gender}
        <br />
        SSN: {patient.ssn}
        <br />
        Occupation: {patient.occupation}
      </div>
      <h3>Entries</h3>
      {patient.entries.map(entry => {
        return (
          <div>
            {entry.date} {entry.description}
            <br />
            Specialist: {entry.specialist}
            <br />
            <ul>
              {entry.diagnosisCodes?.map(code => {
                const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
                if (diagnosis) {
                  return (
                    <li>{code} {diagnosis.name}</li>
                  );
                }
              })}
            </ul>
          </div>
        );
      })}
      <div>
      </div>
    </div>
  );
};

export default SinglePatient;