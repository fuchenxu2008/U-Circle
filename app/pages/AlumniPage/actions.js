/*
 *
 * AlumniPage actions
 *
 */

import {
  SUBMIT_NEW_ALUMNI_QUESTION,
  GET_ALUMNI_QUESTIONS,
  SUBSCRIBE_QUESTION,
  GET_ALL_ALUMNI,
  CHANGE_TAB,
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

export function getAllAlumni() {
  return {
    type: GET_ALL_ALUMNI,
    payload: api.getAllAlumni(),
  };
}

export function changeTab(tab) {
  return {
    type: CHANGE_TAB,
    payload: tab,
  };
}
