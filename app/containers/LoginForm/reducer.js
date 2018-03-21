/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import { message } from 'antd';

import {
  CHANGE_FORM_MODE,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED,
} from './constants';

const initialState = fromJS({
  formMode: 'login',
  loading: false,
});


const showLoginAlert = (mode, status) => {
  status
    ? message.success(`${mode} sucess!`)
    : message.error(`${mode} failed!`);
};

function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM_MODE:
      return state.set('formMode', action.mode);
    case REGISTER_PENDING:
      return state.set('loading', true);
    case LOGIN_PENDING:
      return state.set('loading', true);
    case REGISTER_FULFILLED:
      showLoginAlert('Registration', true);
      return state.set('loading', false);
    case LOGIN_FULFILLED:
      showLoginAlert('Login', true);
      return state.set('loading', false);
    case REGISTER_REJECTED:
      showLoginAlert('Registration', false);
      return state.set('loading', false);
    case LOGIN_REJECTED:
      showLoginAlert('Login', false);
      return state.set('loading', false);
    default:
      return state;
  }
}

export default loginFormReducer;
