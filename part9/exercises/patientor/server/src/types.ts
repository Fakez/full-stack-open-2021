export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export type Gender = 'male' | 'female'

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries' >;

export interface Entry {
}

export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NewPatientEntry= Omit<PatientEntry, 'id'>;
