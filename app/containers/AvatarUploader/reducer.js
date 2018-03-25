/*
 *
 * AvatarUploader reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPLOAD_AVATAR_FULFILLED,
} from './constants';

const initialState = fromJS({});

function avatarUploaderReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_AVATAR_FULFILLED:
      return state;
    default:
      return state;
  }
}

export default avatarUploaderReducer;
