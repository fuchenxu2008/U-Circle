import axios from 'axios';

import { ROOT_URL } from '../../config';
import { getAuthHeader } from '../../authMiddleware';

export function getMyQuestions(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}/questions`, getAuthHeader());
}

export function getMyAnswers(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}/answers`, getAuthHeader());
}

export function getMySubscription(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}/subscription`, getAuthHeader());
}
