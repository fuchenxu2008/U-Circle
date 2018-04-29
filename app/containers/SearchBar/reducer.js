/*
 *
 * SearchBar reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_TYPE_CHANGE,
  SEARCH_MAJOR_CHANGE,
  SEARCH_KEYWORD_CHANGE,
  SEARCH_FULFILLED,
  BEGIN_SEARCH,
  END_SEARCH,
} from './constants';

const initialState = fromJS({
  searching: false,
  searchPhrase: {
    type: '',
    major: '',
    keyword: '',
  },
  searchResult: [],
});

function searchBarReducer(state = initialState, action) {
  switch (action.type) {
    case BEGIN_SEARCH:
      return state.set('searching', true);
    case END_SEARCH:
      return state.set('searching', false);
    case SEARCH_TYPE_CHANGE:
      return state.updateIn(['searchPhrase', 'type'], () => action.payload);
    case SEARCH_MAJOR_CHANGE:
      return state.updateIn(['searchPhrase', 'major'], () => action.payload);
    case SEARCH_KEYWORD_CHANGE:
      return state.updateIn(['searchPhrase', 'keyword'], () => action.payload);
    case SEARCH_FULFILLED:
      return state.set('searchResult', fromJS(action.payload.data));
    default:
      return state;
  }
}

export default searchBarReducer;
