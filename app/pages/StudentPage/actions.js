/*
 *
 * StudentPage actions
 *
 */

import {
  SUBMIT_NEW_STUDENT_QUESTION,
  GET_STUDENT_QUESTIONS,
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
