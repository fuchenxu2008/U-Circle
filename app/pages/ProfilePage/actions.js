/*
 *
 * ProfilePage actions
 *
 */

import {
  GET_MY_QUESTIONS, GET_MY_ANSWERS, GET_MY_SUBSCRIPTION,
} from './constants';
import * as api from './api';

export function getMyQuestions(id) {
  return {
    type: GET_MY_QUESTIONS,
    payload: api.getMyQuestions(id),
  };
}

export function getMyAnswers(id) {
  return {
    type: GET_MY_ANSWERS,
    payload: api.getMyAnswers(id),
  };
}

export function getMySubscription(id) {
  return {
    type: GET_MY_SUBSCRIPTION,
    payload: api.getMySubscription(id),
  };
}
