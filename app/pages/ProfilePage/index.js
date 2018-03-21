/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        ProfilePage
      </div>
    );
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profilepage: makeSelectProfilePage(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ProfilePage);
