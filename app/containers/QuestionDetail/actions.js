/*
 *
 * QuestionDetail actions
 *
 */

import {
  GET_QUESTION,
  DELETE_QUESTION,
  CLEAR_DETAIL_PAGE,
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

export function clearDetailPage() {
  return {
    type: CLEAR_DETAIL_PAGE,
  };
}
