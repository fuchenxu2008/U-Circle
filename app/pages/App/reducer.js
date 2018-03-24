import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  LOGIN_FULFILLED,
  REGISTER_FULFILLED,
  SET_USER,
  LOG_OUT,
} from './constants';
import { setCurrentUser, getCurrentUser, clearCurrentUser } from '../../authMiddleware';

const initialState = fromJS({});

function currentUser(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FULFILLED:
      return state;
    case LOGIN_FULFILLED:
      setCurrentUser(action.payload.data);
      return action.payload.data;
    case SET_USER:
      return getCurrentUser();
    case LOG_OUT:
      clearCurrentUser();
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  currentUser,
});
