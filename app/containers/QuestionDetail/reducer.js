/*
 *
 * QuestionDetail reducer
 *
 */

// import { fromJS } from 'immutable';
// import { mapKeys, omit } from 'lodash';

import {
  GET_QUESTION_FULFILLED,
  GET_QUESTION_REJECTED,
  DELETE_QUESTION_FULFILLED,
  DELETE_QUESTION_REJECTED,
  CLEAR_DETAIL_PAGE,
  ANSWER_QUESTION_FULFILLED,
  DELETE_ANSWER_FULFILLED,
  PICK_ANSWER_FULFILLED,
} from './constants';

const initialState = null;

function questionDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION_FULFILLED:
      return action.payload.data;
    case GET_QUESTION_REJECTED:
      return state;
    case DELETE_QUESTION_FULFILLED:
      return state;
    case DELETE_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case CLEAR_DETAIL_PAGE:
      return null;
    case ANSWER_QUESTION_FULFILLED:
      return {
        ...state,
        ...action.payload.data.question,
      };
    case DELETE_ANSWER_FULFILLED:
      return {
        ...state,
        answer: state.answer.filter(a => a._id !== action.payload.data.answer._id),
        bestAnswer: state.bestAnswer /* eslint no-nested-ternary: 0 */
          ? (state.bestAnswer._id === action.payload.data.answer._id ? null : state.bestAnswer)
          : null,
      };
    case PICK_ANSWER_FULFILLED:
      return action.payload.data;
    default:
      return state;
  }
}

export default questionDetailReducer;
