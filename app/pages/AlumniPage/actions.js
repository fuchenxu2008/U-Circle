/*
 *
 * AlumniPage actions
 *
 */

import {
  SUBMIT_NEW_ALUMNI_QUESTION,
  GET_ALUMNI_QUESTIONS,
  SUBSCRIBE_QUESTION,
} from './constants';
import * as api from './api';

export function getAlumniQuestions() {
  return {
    type: GET_ALUMNI_QUESTIONS,
    payload: api.getAlumniQuestions(),
  };
}

export function addQuestion(question) {
  return {
    type: SUBMIT_NEW_ALUMNI_QUESTION,
    payload: api.addQuestion(question),
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

