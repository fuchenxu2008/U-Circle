import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  LOGIN_FULFILLED,
  // LOGIN_REJECTED,
  REGISTER_FULFILLED,
  // REGISTER_REJECTED,
} from './constants';

const initialState = fromJS({});

function currentUser(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FULFILLED:
      console.log(action.payload.data);
      return state;
    case LOGIN_FULFILLED:
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}

export default combineReducers({
  currentUser,
});
