/*
 *
 * ProfilePage actions
 *
 */

import {
  GET_USER_QUESTIONS, GET_USER_ANSWERS, GET_USER_SUBSCRIPTION, GET_USER_INFO, CLEAR_PROFILE_PAGE,
} from './constants';
import * as api from './api';

export function getUserQuestions(id) {
  return {
    type: GET_USER_QUESTIONS,
    payload: api.getUserQuestions(id),
  };
}

export function getUserAnswers(id) {
  return {
    type: GET_USER_ANSWERS,
    payload: api.getUserAnswers(id),
  };
}

export function getUserSubscription(id) {
  return {
    type: GET_USER_SUBSCRIPTION,
    payload: api.getUserSubscription(id),
  };
}

export function getUserInfo(id) {
  return {
    type: GET_USER_INFO,
    payload: api.getUserInfo(id),
  };
}

export function clearProfilePage() {
  return {
    type: CLEAR_PROFILE_PAGE,
  };
}
