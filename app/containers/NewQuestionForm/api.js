import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';
import authHeader from '../../authMiddleware';

export function addQuestion(question) {
  return axios.post(`${ROOT_URL}/api/question`, question, authHeader);
}
