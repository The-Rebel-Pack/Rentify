import axios from 'axios';
import config from '../config';

const requestCategories = async () => {
  const url = `${config.apiUrl}/api/listings/categories`;
  const res = await axios.get(url);
  return res.data;
};

export default requestCategories;