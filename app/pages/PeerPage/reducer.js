/*
 *
 * PeerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PEER_QUESTIONS_FULFILLED,
} from './constants';

const initialState = fromJS({
  questions: [],
});

function peerPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PEER_QUESTIONS_FULFILLED:
      return state.set('questions', fromJS(action.payload.data));
    default:
      return state;
  }
}

export default peerPageReducer;
