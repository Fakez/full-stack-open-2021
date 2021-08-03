
import diaries from '../data/diaries'
import { NonSensitiveDiaryEntry } from '../types';


const getEntries = () => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};


export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};