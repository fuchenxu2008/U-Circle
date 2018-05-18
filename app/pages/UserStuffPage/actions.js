/*
 *
 * UserStuffPage actions
 *
 */

import {
  GET_USER_QUESTIONS,
  GET_USER_ANSWERS,
  GET_USER_SUBSCRIPTIONS,
  SUBSCRIBE_QUESTION,
} from './constants';
import * as api from './api';

export function getUserStuff({ id, type }) {
  let actionType = '';
  switch (type) {
    case 'questions':
      actionType = GET_USER_QUESTIONS;
      break;
    case 'answers':
      actionType = GET_USER_ANSWERS;
      break;
    case 'subscriptions':
      actionType = GET_USER_SUBSCRIPTIONS;
      break;
    default:
      break;
  }
  return {
    type: actionType,
    payload: api.getUserStuff({ id, type }),
  };
}

/**
 * @param {info} { userId, questionId }
 */
export function subscribeQuestion(info) {
  return {
    type: SUBSCRIBE_QUESTION,
    payload: api.subscribeQuestion(info),
  };
}
