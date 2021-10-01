import axios from 'axios';
import config from '../config';

const requestListings = async (query) => {
  // const params = [];
  // if (query) {
  //   if (query.categories) {
  //     params.push(`categories=${query.categories.join(',')}`);
  //   }
  //   if (query.page > 1) {
  //     params.push(`page=${query.page}`);
  //   }
  // }
  // const apiParams = params.join('&');
  const apiParams = new URLSearchParams(query).toString();
  const url = `${config.apiUrl}/api/listings/?${apiParams}`;
  const res = await axios.get(url);
  // console.log(res.data)
  // console.log(apiParams ? apiParams : 'All listings requested')
  return res.data;
};

export default requestListings;