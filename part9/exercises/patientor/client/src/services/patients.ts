import axios from 'axios';
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const request = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
    return request.data;
};

export default {
    getAll,
};