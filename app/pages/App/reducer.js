import { Iterable } from 'immutable';
import { combineReducers } from 'redux-immutable';

import { UPLOAD_AVATAR_FULFILLED } from 'containers/AvatarUploader/constants';
import {
  LOGIN_FULFILLED,
  REGISTER_FULFILLED,
  SET_USER_FULFILLED,
  LOG_OUT,
} from './constants';

const initialUserState = null;

function currentUser(state = initialUserState, action) {
  switch (action.type) {
    case REGISTER_FULFILLED:
      return state;
    case LOGIN_FULFILLED:
      return action.payload.data;
    case SET_USER_FULFILLED: {
      // App reload will initiate the state with `fromJS(loadState())`
      const oldState = Iterable.isIterable(state) ? state.toJS() : state;
      return {
        ...oldState,
        ...action.payload.data,
      };
    }
    case LOG_OUT:
      return null;
    case UPLOAD_AVATAR_FULFILLED:
      return {
        ...state,
        avatar: action.payload.data.avatar,
      };
    default:
      return state;
  }
}

export default combineReducers({
  currentUser,
});
