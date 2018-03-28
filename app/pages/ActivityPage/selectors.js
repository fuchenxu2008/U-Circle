import { createSelector } from 'reselect';

/**
 * Direct selector to the activityPage state domain
 */
const selectActivityPageDomain = state => state.get('activityPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ActivityPage
 */

const makeSelectActivityPage = createSelector(
  selectActivityPageDomain,
  state => state.toJS()
);

export default makeSelectActivityPage;
export {
  selectActivityPageDomain,
};
