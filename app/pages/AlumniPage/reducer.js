/*
 *
 * AlumniPage reducer
 *
 */

import { fromJS } from 'immutable';
import { mapKeys, omit } from 'lodash';

import {
  DELETE_QUESTION_FULFILLED,
  DELETE_QUESTION_REJECTED,
} from 'containers/QuestionDetail/constants';
import {
  GET_ALUMNI_QUESTIONS_FULFILLED,
  GET_ALUMNI_QUESTIONS_REJECTED,
  SUBMIT_NEW_ALUMNI_QUESTION_FULFILLED,
  SUBMIT_NEW_ALUMNI_QUESTION_REJECTED,
  SUBSCRIBE_QUESTION_FULFILLED,
  GET_ALL_ALUMNI_FULFILLED,
  CHANGE_TAB,
} from './constants';

import { loadState } from '../../utils/localStorage';
const persistedCachedData = loadState('cachedData') || {};
const persistedAlumniPageState = persistedCachedData.alumniPage;

const initialState = fromJS({
  alumniQuestions: {},
  allAlumni: [],
  activeTab: '1',
  ...persistedAlumniPageState,
});

function alumniPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALUMNI_QUESTIONS_FULFILLED: {
      const alumniQuestions = mapKeys(action.payload.data, '_id');
      return state.set('alumniQuestions', fromJS(alumniQuestions));
    }
    case GET_ALUMNI_QUESTIONS_REJECTED:
      console.log(action.payload);
      return state;
    case SUBMIT_NEW_ALUMNI_QUESTION_FULFILLED:
      return state.updateIn(['alumniQuestions'], list =>
        list.merge({
          [action.payload.data.question._id]: action.payload.data.question,
        })
      );
    case SUBMIT_NEW_ALUMNI_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case DELETE_QUESTION_FULFILLED:
      return state.updateIn(['alumniQuestions'], list =>
        fromJS(omit(list.toJS(), action.payload.data.question._id))
      );
    case DELETE_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case SUBSCRIBE_QUESTION_FULFILLED:
      return state.updateIn(['alumniQuestions'], list =>
        list.merge({
          [action.payload.data._id]: action.payload.data,
        })
      );
    case GET_ALL_ALUMNI_FULFILLED:
      return state.set('allAlumni', fromJS(action.payload.data));
    case CHANGE_TAB:
      return state.set('activeTab', action.payload);
    default:
      return state;
  }
}

export default alumniPageReducer;
