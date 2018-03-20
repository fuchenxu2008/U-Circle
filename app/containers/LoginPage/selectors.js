import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = state => state.get('loginPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = createSelector(
  selectLoginPageDomain,
  state => state.toJS()
);

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
};
