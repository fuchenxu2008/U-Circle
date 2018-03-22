/*
 *
 * PeerPage actions
 *
 */

import {
  GET_PEER_QUESTIONS,
} from './constants';
import * as api from './api';

export function getPeerQuestion(token) {
  return {
    type: GET_PEER_QUESTIONS,
    payload: api.getPeerQuestions(token),
  };
}
