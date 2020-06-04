import * as axios from 'axios';
import * as dotenv from 'dotenv';
import queryString from 'querystring';

dotenv.config();
const baseurl = process.env.REACT_APP_API_URL;

const callApi = (reqType, url, query, params) => {
  const res = axios({
    method: reqType,
    url: `${baseurl}${url}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('token'),
    },
    params,
    data: queryString.stringify(query),
  }).then(({ data: { data } }) => data);
  return res;
};

export { callApi };
