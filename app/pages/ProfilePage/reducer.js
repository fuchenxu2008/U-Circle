/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_MY_QUESTIONS_FULFILLED,
  GET_MY_ANSWERS_FULFILLED,
  GET_MY_SUBSCRIPTION_FULFILLED,
} from './constants';

const initialState = fromJS({
  myQuestions: [],
  myAnswers: [],
  mySubscriptions: [],
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_QUESTIONS_FULFILLED:
      return state.set('myQuestions', fromJS(action.payload.data));
    case GET_MY_ANSWERS_FULFILLED:
      return state.set('myAnswers', fromJS(action.payload.data));
    case GET_MY_SUBSCRIPTION_FULFILLED:
      return state.set('mySubscriptions', fromJS(action.payload.data));
    default:
      return state;
  }
}

export default profilePageReducer;
