/*
 *
 * UserStuffPage reducer
 *
 */

import { fromJS } from 'immutable';
import { mapKeys } from 'lodash';
import {
  GET_USER_QUESTIONS_FULFILLED,
  GET_USER_ANSWERS_FULFILLED,
  GET_USER_SUBSCRIPTIONS_FULFILLED,
  SUBSCRIBE_QUESTION_FULFILLED,
} from './constants';

const initialState = fromJS({
  userQuestions: {},
  userAnswers: {},
  userSubscriptions: {},
});

function userStuffPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_QUESTIONS_FULFILLED:
      return state.set('userQuestions', fromJS(mapKeys(action.payload.data, '_id')));
    case GET_USER_ANSWERS_FULFILLED:
      return state.set('userAnswers', fromJS(mapKeys(action.payload.data, '_id')));
    case GET_USER_SUBSCRIPTIONS_FULFILLED:
      return state.set('userSubscriptions', fromJS(mapKeys(action.payload.data, '_id')));
    case SUBSCRIBE_QUESTION_FULFILLED:
      return state.updateIn(['userQuestions'], list =>
        list.merge({
          [action.payload.data._id]: action.payload.data,
        })
      ).updateIn(['userSubscriptions'], list =>
        list.merge({
          [action.payload.data._id]: action.payload.data,
        })
      );
    default:
      return state;
  }
}

export default userStuffPageReducer;
