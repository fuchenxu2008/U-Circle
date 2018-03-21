import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  LOGIN_FULFILLED,
  REGISTER_FULFILLED,
  SET_USER,
} from './constants';

const initialState = fromJS({});

function currentUser(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FULFILLED:
      console.log(action.payload.data);
      return state;
    case LOGIN_FULFILLED:
      localStorage.setItem('currentUser', JSON.stringify(action.payload.data));
      console.log(action.payload.data);
      return action.payload.data;
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

export default combineReducers({
  currentUser,
});
