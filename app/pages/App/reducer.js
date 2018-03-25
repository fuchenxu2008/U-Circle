import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import { UPLOAD_AVATAR_FULFILLED } from 'containers/AvatarUploader/constants';
import {
  LOGIN_FULFILLED,
  REGISTER_FULFILLED,
  SET_USER_FULFILLED,
  LOG_OUT,
} from './constants';
import { setCurrentUser, clearCurrentUser, getCurrentUser } from '../../authMiddleware';

const initialState = fromJS({});

function currentUser(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FULFILLED:
      return state;
    case LOGIN_FULFILLED:
      setCurrentUser(action.payload.data);
      return fromJS(action.payload.data);
    case SET_USER_FULFILLED:
      return state.merge(action.payload.data, getCurrentUser());
    case LOG_OUT:
      clearCurrentUser();
      return fromJS({});
    case UPLOAD_AVATAR_FULFILLED: {
      const user = state.set('avatar', action.payload.data.avatar);
      setCurrentUser(user.toJS());
      return user;
    }
    default:
      return state;
  }
}

export default combineReducers({
  currentUser,
});
