import axios from 'axios';
import io from 'socket.io-client';

import { ROOT_URL } from '../../config';
import { getAuthHeader } from '../../authMiddleware';

export function register(fields) {
  return axios.post(`${ROOT_URL}/api/auth/register`, fields);
}

export function login(fields) {
  return axios.post(`${ROOT_URL}/api/auth/login`, fields);
}

export function getUser(id) {
  return axios.get(`${ROOT_URL}/api/user/${id}`);
}

export function connectSocket() {
  return io(ROOT_URL);
}

export function closeSocket(socket) {
  return socket.close();
}

export function getNotifications(id) {
  return axios.get(`${ROOT_URL}/api/notification/${id}`, getAuthHeader());
}

/**
 * @param noti is { userId, questionId }
 */
export function markAsRead(noti) {
  return axios.post(`${ROOT_URL}/api/notification/markread`, noti, getAuthHeader());
}
