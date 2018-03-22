/*
 *
 * PeerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PEER_QUESTIONS_FULFILLED,
  SUBMIT_NEW_PEER_QUESTION_FULFILLED,
  SUBMIT_NEW_PEER_QUESTION_REJECTED,
} from './constants';

const initialState = fromJS({
  questions: [],
});

function peerPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PEER_QUESTIONS_FULFILLED:
      return state.set('questions', fromJS(action.payload.data));
    case SUBMIT_NEW_PEER_QUESTION_FULFILLED:
      return state.set('questions', state.get('questions').push(fromJS(action.payload.data.question)));
    case SUBMIT_NEW_PEER_QUESTION_REJECTED:
      console.log(action.payload.data);
      return state;
    default:
      return state;
  }
}

export default peerPageReducer;
