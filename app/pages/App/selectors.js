import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');
const selectGlobal = state => state.get('global');

const makeSelectLocation = () => createSelector(
  selectRoute,
  routeState => routeState.get('location').toJS()
);

const makeSelectGlobal = () => createSelector(
  selectGlobal,
  globalState => globalState.get('global').toJS()
);

export {
  makeSelectLocation,
  makeSelectGlobal,
};
