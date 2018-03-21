import { createSelector } from 'reselect';

/**
 * Direct selector to the navBar state domain
 */
const selectNavBarDomain = state => state.get('navbar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NavBar
 */

const makeSelectNavBar = createSelector(
  selectNavBarDomain,
  state => state.toJS()
);

export default makeSelectNavBar;
export {
  selectNavBarDomain,
};
