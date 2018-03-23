/*
 *
 * PeerPage actions
 *
 */

import {
  GET_PEER_QUESTIONS,
  DELETE_QUESTION,
} from './constants';
import * as api from './api';

export function getPeerQuestions() {
  return {
    type: GET_PEER_QUESTIONS,
    payload: api.getPeerQuestions(),
  };
}

export function deleteQuestion(question) {
  return {
    type: DELETE_QUESTION,
    payload: api.deleteQuestion(question),
  };
}
