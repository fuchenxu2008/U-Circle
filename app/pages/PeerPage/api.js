import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';

export function getPeerQuestions(token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${ROOT_URL}/api/question`, config);
}
