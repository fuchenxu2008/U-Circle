import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  LOGIN_FULFILLED,
  REGISTER_FULFILLED,
  SET_USER,
  LOG_OUT,
} from './constants';

const initialState = fromJS({});

function currentUser(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FULFILLED:
      return state;
    case LOGIN_FULFILLED:
      localStorage.setItem('currentUser', JSON.stringify(action.payload.data));
      return action.payload.data;
    case SET_USER:
      return JSON.parse(localStorage.getItem('currentUser'));
    case LOG_OUT:
      localStorage.clear();
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  currentUser,
});
