import axios from 'axios';
import config from '../config';

const requestListings = async (query) => {
  const url = `${config.apiUrl}/api/listings/${query}`;
  const res = await axios.get(url);
  console.log('Api call:', query ? query : 'all listings');
  return res.data;
};

export default requestListings;