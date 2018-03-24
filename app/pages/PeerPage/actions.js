/*
 *
 * PeerPage actions
 *
 */

import {
  SUBMIT_NEW_PEER_QUESTION,
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

export function addQuestion(question) {
  return {
    type: SUBMIT_NEW_PEER_QUESTION,
    payload: api.addQuestion(question),
  };
}

export function deleteQuestion(question) {
  return {
    type: DELETE_QUESTION,
    payload: api.deleteQuestion(question),
  };
}
