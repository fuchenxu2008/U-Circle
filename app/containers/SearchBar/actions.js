/*
 *
 * SearchBar actions
 *
 */

import {
  SEARCH_TYPE_CHANGE,
  SEARCH_MAJOR_CHANGE,
  SEARCH_KEYWORD_CHANGE,
  SEARCH,
} from './constants';
import * as api from './api';


export function searchTypeChange(searchType) {
  return {
    type: SEARCH_TYPE_CHANGE,
    payload: searchType,
  };
}

export function searchMajorChange(searchMajor) {
  return {
    type: SEARCH_MAJOR_CHANGE,
    payload: searchMajor,
  };
}

export function searchKeywordChange(searchKeyword) {
  return {
    type: SEARCH_KEYWORD_CHANGE,
    payload: searchKeyword,
  };
}

export function searchQuestion(searchPhrase) {
  return {
    type: SEARCH,
    payload: api.searchQuestion(searchPhrase),
  };
}
