import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';
import { getAuthHeader } from '../../authMiddleware';

export function getPeerQuestions() {
  return axios.get(`${ROOT_URL}/api/question`, getAuthHeader());
}

export function deleteQuestion(question) {
  return axios.delete(`${ROOT_URL}/api/question`, {
    ...getAuthHeader(),
    data: {
      id: question._id,
      type: question.type,
    },
  });
}
