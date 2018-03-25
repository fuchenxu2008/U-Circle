import axios from 'axios';

import { ROOT_URL } from '../../../shared/config';
import { getAuthHeader } from '../../authMiddleware';

export function uploadAvatar(avatar) {
  const data = new FormData();
  data.append('avatar', avatar);
  return axios.post(`${ROOT_URL}/api/user/avatar`, data, getAuthHeader());
}
