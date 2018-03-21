import { createSelector } from 'reselect';

/**
 * Direct selector to the alumniPage state domain
 */
const selectAlumniPageDomain = state => state.get('alumniPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AlumniPage
 */

const makeSelectAlumniPage = createSelector(
  selectAlumniPageDomain,
  state => state.toJS()
);

export default makeSelectAlumniPage;
export {
  selectAlumniPageDomain,
};
