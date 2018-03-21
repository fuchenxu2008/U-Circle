/**
 *
 * PeerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectPeerPage from './selectors';
import reducer from './reducer';

export class PeerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>PeerPage</title>
          <meta name="description" content="Description of PeerPage" />
        </Helmet>
        PeerPage
      </div>
    );
  }
}

PeerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  peerpage: makeSelectPeerPage(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'peerPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(PeerPage);
