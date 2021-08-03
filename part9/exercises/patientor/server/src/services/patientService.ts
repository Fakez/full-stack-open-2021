import {v1 as uuid} from 'uuid'
import patients from '../data/patients'
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types'

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => (
    {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};


const addEntry = (entry: NewPatientEntry): PatientEntry => {

  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getEntries,
  addEntry
};