import {v1 as uuid} from 'uuid'
import patients from '../data/patients'
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types'

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => (
    {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patients.find(p => p.id === id);
}

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
  getPatientById,
  addEntry,
};