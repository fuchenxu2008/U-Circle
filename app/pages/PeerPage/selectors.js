import { createSelector } from 'reselect';

/**
 * Direct selector to the peerPage state domain
 */
const selectPeerPageDomain = state => state.get('peerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PeerPage
 */

const makeSelectPeerPage = createSelector(
  selectPeerPageDomain,
  state => state.toJS()
);

export default makeSelectPeerPage;
export {
  selectPeerPageDomain,
};
