/*
 *
 * NewQuestionForm actions
 *
 */

import {
  SUBMIT_NEW_PEER_QUESTION,
} from './constants';
import * as api from './api';

export function addQuestion(question) {
  return {
    type: SUBMIT_NEW_PEER_QUESTION,
    payload: api.addQuestion(question),
  };
}
