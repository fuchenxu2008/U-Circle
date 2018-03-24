/*
 *
 * PeerPage reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';

import {
  DELETE_QUESTION_FULFILLED,
  DELETE_QUESTION_REJECTED,
} from 'containers/QuestionDetail/constants';
import {
  GET_PEER_QUESTIONS_FULFILLED,
  GET_PEER_QUESTIONS_REJECTED,
  SUBMIT_NEW_PEER_QUESTION_FULFILLED,
  SUBMIT_NEW_PEER_QUESTION_REJECTED,
} from './constants';

const initialState = fromJS({
  peerQuestions: {},
});

function peerPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PEER_QUESTIONS_FULFILLED: {
      const peerQuestions = _.mapKeys(action.payload.data, '_id');
      return state.set('peerQuestions', fromJS(peerQuestions));
    }
    case GET_PEER_QUESTIONS_REJECTED:
      console.log(action.payload);
      return state;
    case SUBMIT_NEW_PEER_QUESTION_FULFILLED:
      return state.updateIn(['peerQuestions'], list =>
        list.merge(
          { [action.payload.data.question._id]: action.payload.data.question }
        )
      );
    case SUBMIT_NEW_PEER_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    case DELETE_QUESTION_FULFILLED:
      return state.updateIn(['peerQuestions'], list => (
        fromJS(_.omit(list.toJS(), action.payload.data.question._id))
      ));
    case DELETE_QUESTION_REJECTED:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export default peerPageReducer;
