/*
 *
 * NewQuestionForm reducer
 *
 */

import { fromJS } from 'immutable';
// import {
//   SUBMIT_NEW_PEER_QUESTION_FULFILLED,
//   SUBMIT_NEW_PEER_QUESTION_REJECTED,
// } from './constants';

const initialState = fromJS({});

function newQuestionFormReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default newQuestionFormReducer;
