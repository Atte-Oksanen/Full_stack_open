import axios from 'axios';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  return (await axios.get(`${apiBaseUrl}/diagnoses`)).data;
};

export default { getAll };