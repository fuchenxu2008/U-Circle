/*
 *
 * MyStuffPage reducer
 *
 */

import { fromJS } from 'immutable';
import { mapKeys } from 'lodash';
import {
  GET_MY_QUESTIONS_FULFILLED,
  GET_MY_ANSWERS_FULFILLED,
  GET_MY_SUBSCRIPTIONS_FULFILLED,
  SUBSCRIBE_QUESTION_FULFILLED,
} from './constants';

const initialState = fromJS({
  myQuestions: {},
  myAnswers: {},
  mySubscriptions: {},
});

function myStuffPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_QUESTIONS_FULFILLED:
      return state.set('myQuestions', fromJS(mapKeys(action.payload.data, '_id')));
    case GET_MY_ANSWERS_FULFILLED:
      return state.set('myAnswers', fromJS(mapKeys(action.payload.data, '_id')));
    case GET_MY_SUBSCRIPTIONS_FULFILLED:
      return state.set('mySubscriptions', fromJS(mapKeys(action.payload.data, '_id')));
    case SUBSCRIBE_QUESTION_FULFILLED:
      return state.updateIn(['myQuestions'], list =>
        list.merge({
          [action.payload.data._id]: action.payload.data,
        })
      ).updateIn(['mySubscriptions'], list =>
        list.merge({
          [action.payload.data._id]: action.payload.data,
        })
      );
    default:
      return state;
  }
}

export default myStuffPageReducer;
