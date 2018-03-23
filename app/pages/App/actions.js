import { REGISTER, LOGIN, SET_USER, LOG_OUT } from './constants';

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

export function setCurrentUser() {
  return {
    type: SET_USER,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}
