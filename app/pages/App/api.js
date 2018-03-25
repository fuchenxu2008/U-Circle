import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';
import { getCurrentUser } from '../../authMiddleware';

export function register(fields) {
  return axios.post(`${ROOT_URL}/api/auth/register`, fields);
}

export function login(fields) {
  return axios.post(`${ROOT_URL}/api/auth/login`, fields);
}

export function getUser() {
  const id = getCurrentUser()._id;
  return axios.get(`${ROOT_URL}/api/user/${id}`);
}
