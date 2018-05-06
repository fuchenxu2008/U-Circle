/*
 *
 * StudentPage actions
 *
 */

import {
  SUBMIT_NEW_STUDENT_QUESTION,
  GET_STUDENT_QUESTIONS,
  SUBSCRIBE_QUESTION,
} from './constants';
import * as api from './api';

export function getStudentQuestions() {
  return {
    type: GET_STUDENT_QUESTIONS,
    payload: api.getStudentQuestions(),
  };
}

export function addQuestion(question) {
  return {
    type: SUBMIT_NEW_STUDENT_QUESTION,
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
