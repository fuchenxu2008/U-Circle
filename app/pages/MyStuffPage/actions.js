/*
 *
 * MyStuffPage actions
 *
 */

import {
  GET_MY_QUESTIONS,
  GET_MY_ANSWERS,
  GET_MY_SUBSCRIPTIONS,
  SUBSCRIBE_QUESTION,
} from './constants';
import * as api from './api';

export function getMyStuff({ id, type }) {
  let actionType = '';
  switch (type) {
    case 'questions':
      actionType = GET_MY_QUESTIONS;
      break;
    case 'answers':
      actionType = GET_MY_ANSWERS;
      break;
    case 'subscriptions':
      actionType = GET_MY_SUBSCRIPTIONS;
      break;
    default:
      break;
  }
  return {
    type: actionType,
    payload: api.getMyStuff({ id, type }),
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
