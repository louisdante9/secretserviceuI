import axios from 'axios';

/**
 *
 * @description this method sets authetication for users
 *
 * @param { object } token
 *
 * @returns { Object } json
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = token;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setAuthToken;