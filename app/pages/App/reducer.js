import { fromJS } from 'immutable';

import { UPLOAD_AVATAR_FULFILLED } from 'containers/AvatarUploader/constants';
import {
  LOGIN_FULFILLED,
  REGISTER_FULFILLED,
  SET_USER_FULFILLED,
  LOG_OUT,
  ESTABLISH_SOCKET,
  CLOSE_SOCKET,
  GET_NOTIFICATION_FULFILLED,
} from './constants';
import { SUBMIT_NEW_STUDENT_QUESTION_FULFILLED } from '../StudentPage/constants';
import { SUBMIT_NEW_ALUMNI_QUESTION_FULFILLED } from '../AlumniPage/constants';
import { ANSWER_QUESTION_FULFILLED } from '../../containers/QuestionDetail/constants';

import { loadState } from '../../utils/localStorage';
const persistedGlobalState = loadState('globalState');

const initialState = fromJS({
  currentUser: null,
  token: null,
  socket: null,
  notifications: [],
  ...persistedGlobalState,
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case ESTABLISH_SOCKET:
      return state.set('socket', fromJS(action.payload));
    case CLOSE_SOCKET:
      return state.set('socket', null);
    case GET_NOTIFICATION_FULFILLED:
      return state.set('notifications', fromJS(action.payload.data));
    case REGISTER_FULFILLED:
      return state
        .set('currentUser', fromJS(action.payload.data))
        .set('token', action.payload.data.token);
    case LOGIN_FULFILLED:
      return state
        .set('currentUser', fromJS(action.payload.data))
        .set('token', action.payload.data.token);
    case SET_USER_FULFILLED:
      return state.set('currentUser', fromJS(action.payload.data));
    case LOG_OUT:
      return state
        .set('currentUser', null)
        .set('token', null)
        .set('notifications', fromJS([]));
    case UPLOAD_AVATAR_FULFILLED:
      return state.updateIn(['currentUser', 'avatar'], () => action.payload.data.avatar);
    case SUBMIT_NEW_ALUMNI_QUESTION_FULFILLED:
      return state.updateIn(['currentUser', 'credit'], () => action.payload.data.remainingCredit);
    case SUBMIT_NEW_STUDENT_QUESTION_FULFILLED:
      return state.updateIn(['currentUser', 'credit'], () => action.payload.data.remainingCredit);
    case ANSWER_QUESTION_FULFILLED:
      return state.updateIn(['currentUser', 'credit'], () => action.payload.data.remainingCredit);
    default:
      return state;
  }
}

export default globalReducer;
