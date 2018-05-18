import axios from 'axios';

import { ROOT_URL } from '../../config';
import { getAuthHeader } from '../../authMiddleware';

export function getUserQuestions(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}/questions`, getAuthHeader());
}

export function getUserAnswers(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}/answers`, getAuthHeader());
}

export function getUserSubscription(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}/subscriptions`, getAuthHeader());
}

export function getUserInfo(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}`, getAuthHeader());
}
