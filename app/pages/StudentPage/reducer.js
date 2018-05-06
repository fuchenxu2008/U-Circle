/*
 *
 * StudentPage reducer
 *
 */

import { fromJS } from 'immutable';
import { mapKeys, omit } from 'lodash';

import {
  DELETE_QUESTION_FULFILLED,
  DELETE_QUESTION_REJECTED,
} from 'containers/QuestionDetail/constants';
import {
  GET_STUDENT_QUESTIONS_FULFILLED,
  GET_STUDENT_QUESTIONS_REJECTED,
  SUBMIT_NEW_STUDENT_QUESTION_FULFILLED,
  SUBMIT_NEW_STUDENT_QUESTION_REJECTED,
  SUBSCRIBE_QUESTION_FULFILLED,
} from './constants';

const initialState = fromJS({
  studentQuestions: {},
});

function studentPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_QUESTIONS_FULFILLED: {
      const studentQuestions = mapKeys(action.payload.data, '_id');
      return state.set('studentQuestions', fromJS(studentQuestions));
    }
    case GET_STUDENT_QUESTIONS_REJECTED:
      console.log(action.payload);
      return state;
    case SUBMIT_NEW_STUDENT_QUESTION_FULFILLED:
      return state.updateIn(['studentQuestions'], list =>
        list.merge({
          [action.payload.data.question._id]: action.payload.data.question,
        })
      );
    case SUBMIT_NEW_STUDENT_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case DELETE_QUESTION_FULFILLED:
      return state.updateIn(['studentQuestions'], list =>
        fromJS(omit(list.toJS(), action.payload.data.question._id))
      );
    case DELETE_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case SUBSCRIBE_QUESTION_FULFILLED:
      return state.updateIn(['studentQuestions'], list =>
        list.merge({
          [action.payload.data._id]: action.payload.data,
        })
      );
    default:
      return state;
  }
}

export default studentPageReducer;
