import axios from 'axios';
import config from '../config';

const requestListings = async (query) => {
  const url = `${config.apiUrl}/api/listings/?${query}`;
  const res = await axios.get(url);
  console.log(query ? query : 'All listings requested')
  return res.data;
};

export default requestListings;