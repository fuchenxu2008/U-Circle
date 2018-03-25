/*
 *
 * QuestionDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_QUESTION_FULFILLED,
  GET_QUESTION_REJECTED,
  DELETE_QUESTION_FULFILLED,
  DELETE_QUESTION_REJECTED,
  CLEAR_DETAIL_PAGE,
} from './constants';

const initialState = fromJS({});

function questionDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION_FULFILLED:
      return fromJS(action.payload.data);
    case GET_QUESTION_REJECTED:
      return state;
    case DELETE_QUESTION_FULFILLED:
      return state;
    case DELETE_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case CLEAR_DETAIL_PAGE:
      return fromJS({});
    default:
      return state;
  }
}

export default questionDetailReducer;
