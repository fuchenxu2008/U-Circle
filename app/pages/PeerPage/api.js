import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';
import { getAuthHeader, getCurrentUser } from '../../authMiddleware';

export function getPeerQuestions() {
  return axios.get(`${ROOT_URL}/api/question`);
}

export function addQuestion(question) {
  return axios.post(`${ROOT_URL}/api/question`, {
    ...question,
    questionerID: getCurrentUser('_id'),
  }, getAuthHeader());
}
