import {
  REGISTER,
  LOGIN,
  SET_USER,
  ESTABLISH_SOCKET,
  CLOSE_SOCKET,
  LOG_OUT,
  GET_NOTIFICATION,
  MARK_READ_NOTI,
} from './constants';

import * as api from './api';

export function registerAction(fields) {
  return dispatch => {
    dispatch(register(fields))
      .then(res => dispatch(getNotifications(res.value.data._id)))
      .catch(err => console.log(err));
  };
}

export function register(fields) {
  return {
    type: REGISTER,
    payload: api.register(fields),
  };
}

export function loginAction(fields) {
  return dispatch => {
    dispatch(login(fields))
      .then(res => {
        dispatch(getNotifications(res.value.data._id));
      })
      .catch(err => console.log(err));
  };
}

export function login(fields) {
  return {
    type: LOGIN,
    payload: api.login(fields),
  };
}

// Set existing user from localStorage
export function setCurrentUser(id) {
  return {
    type: SET_USER,
    payload: api.getUser(id),
  };
}

export function establishSocket() {
  return {
    type: ESTABLISH_SOCKET,
    payload: api.connectSocket(),
  };
}

export function closeSocket(socket) {
  return {
    type: CLOSE_SOCKET,
    payload: api.closeSocket(socket),
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export function getNotifications(id) {
  return {
    type: GET_NOTIFICATION,
    payload: api.getNotifications(id),
  };
}

export function markNotiAsRead(noti) {
  return dispatch => {
    dispatch(readNoti(noti))
      .then(res => dispatch(getNotifications(res.value.data.userId)))
      .catch(err => console.log(err));
  };
}

export function readNoti(noti) {
  return {
    type: MARK_READ_NOTI,
    payload: api.markAsRead(noti),
  };
}
