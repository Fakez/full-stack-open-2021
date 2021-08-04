import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  //res.send(diaryService.getNonSensitiveEntries());
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientById(id));
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;
  const newPatientEntry = patientService.addEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  });
  res.json(newPatientEntry);
});

export default router;