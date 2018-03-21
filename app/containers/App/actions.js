import { REGISTER, LOGIN } from './constants';

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
