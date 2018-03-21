import axios from 'axios';

const { ROOT_URL } = require('../../../shared/config');

export function register(fields) {
  return axios.post(`${ROOT_URL}/api/auth/register`, fields);
}

export function login(fields) {
  return axios.post(`${ROOT_URL}/api/auth/login`, fields);
}
