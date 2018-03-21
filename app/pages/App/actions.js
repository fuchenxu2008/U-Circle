import { REGISTER, LOGIN, SET_USER } from './constants';

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

export function setCurrentUser(user) {
  return {
    type: SET_USER,
    user,
  };
}
