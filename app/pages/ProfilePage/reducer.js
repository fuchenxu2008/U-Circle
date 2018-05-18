/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USER_QUESTIONS_FULFILLED,
  GET_USER_ANSWERS_FULFILLED,
  GET_USER_SUBSCRIPTION_FULFILLED,
  GET_USER_INFO_FULFILLED,
  CLEAR_PROFILE_PAGE,
} from './constants';

const initialState = fromJS({
  userQuestions: [],
  userAnswers: [],
  userSubscriptions: [],
  user: null,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_QUESTIONS_FULFILLED:
      return state.set('userQuestions', fromJS(action.payload.data));
    case GET_USER_ANSWERS_FULFILLED:
      return state.set('userAnswers', fromJS(action.payload.data));
    case GET_USER_SUBSCRIPTION_FULFILLED:
      return state.set('userSubscriptions', fromJS(action.payload.data));
    case GET_USER_INFO_FULFILLED:
      return state.set('user', fromJS(action.payload.data));
    case CLEAR_PROFILE_PAGE:
      return initialState;
    default:
      return state;
  }
}

export default profilePageReducer;
