import axios from 'axios';

import { ROOT_URL } from '../../config';
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

export function answerQuestion(fields) {
  return axios.post(`${ROOT_URL}/api/question/${fields.questionId}`, fields, getAuthHeader());
}

export function deleteAnswer(id) {
  return axios.delete(`${ROOT_URL}/api/answer/${id}`, getAuthHeader());
}
