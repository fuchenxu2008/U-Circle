import { createSelector } from 'reselect';

/**
 * Direct selector to the newQuestionForm state domain
 */
const selectNewQuestionFormDomain = state => state.get('newQuestionForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NewQuestionForm
 */

const makeSelectNewQuestionForm = createSelector(
  selectNewQuestionFormDomain,
  state => state.toJS()
);

export default makeSelectNewQuestionForm;
export {
  selectNewQuestionFormDomain,
};
