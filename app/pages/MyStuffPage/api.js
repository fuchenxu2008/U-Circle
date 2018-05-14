import axios from 'axios';

import { ROOT_URL } from '../../config';
import { getAuthHeader } from '../../authMiddleware';

export function getMyStuff({ id, type }) {
  return axios.get(`${ROOT_URL}/api/user/${id}/${type}`, getAuthHeader());
}
