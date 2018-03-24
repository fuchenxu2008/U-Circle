import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';
import { getAuthHeader } from '../../authMiddleware';

export function getQuestion(id) {
  return axios.get(`${ROOT_URL}/api/question/${id}`);
}

export function deleteQuestion(id) {
  return axios.delete(`${ROOT_URL}/api/question`, {
    ...getAuthHeader(),
    data: { id },
  });
}
