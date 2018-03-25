/*
 *
 * AvatarUploader actions
 *
 */

import {
  UPLOAD_AVATAR,
} from './constants';
import * as api from './api';

export function uploadAvatar(avatar) {
  return {
    type: UPLOAD_AVATAR,
    payload: api.uploadAvatar(avatar),
  };
}
