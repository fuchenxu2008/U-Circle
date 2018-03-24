/*
 *
 * QuestionDetail actions
 *
 */

import {
  GET_QUESTION,
  DELETE_QUESTION,
} from './constants';
import * as api from './api';

export function getQuestion(id) {
  return {
    type: GET_QUESTION,
    payload: api.getQuestion(id),
  };
}

export function deleteQuestion(id) {
  return {
    type: DELETE_QUESTION,
    payload: api.deleteQuestion(id),
  };
}
