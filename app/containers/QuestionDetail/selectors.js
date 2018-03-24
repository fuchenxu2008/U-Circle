import { createSelector } from 'reselect';

/**
 * Direct selector to the questionDetail state domain
 */
const selectQuestionDetailDomain = state => state.get('questionDetail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuestionDetail
 */

const makeSelectQuestionDetail = createSelector(
  selectQuestionDetailDomain,
  state => state.toJS()
);

export default makeSelectQuestionDetail;
export {
  selectQuestionDetailDomain,
};
