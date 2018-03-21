/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_FORM_MODE } from './constants';

const initialState = fromJS({
  formMode: 'login',
});

function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM_MODE:
      return state.set('formMode', action.mode);
    default:
      return state;
  }
}

export default loginFormReducer;
