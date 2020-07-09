import * as axios from 'axios';
import { baseurl } from './config';

const callApi = async ({
  reqType, url, query, params,
}) => {
  try {
    const res = await axios({
      method: reqType,
      url: `${baseurl}${url}`,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      params,
      data: query,
    });
    return res;
  } catch (err) {
    return { message: err.message, status: 'error' };
  }
};

export { callApi };
