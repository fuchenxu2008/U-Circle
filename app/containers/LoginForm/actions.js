/*
 *
 * LoginForm actions
 *
 */

import { CHANGE_FORM_MODE } from './constants';

export function changeFormMode(mode) {
  return {
    type: CHANGE_FORM_MODE,
    mode: mode === 'login' ? 'register' : 'login',
  };
}
