import {
  REGISTER,
  LOGIN,
  SET_USER,
  ESTABLISH_SOCKET,
  LOG_OUT,
} from './constants';

import * as api from './api';

export function registerAction(fields) {
  return {
    type: REGISTER,
    payload: api.register(fields),
  };
}

export function loginAction(fields) {
  return {
    type: LOGIN,
    payload: api.login(fields),
  };
}

export function setCurrentUser(id) {
  return {
    type: SET_USER,
    payload: api.getUser(id),
  };
}

export function establishSocket() {
  return {
    type: ESTABLISH_SOCKET,
    payload: api.connectSocket(),
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}
