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
// import makeSelectProfilePage from './selectors';
import reducer from './reducer';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const user = this.props.currentUser;
    return (
      <div>
        ProfilePage
        <ul>
          <li>{user.nickname}</li>
          <li>{user.email}</li>
          <li>{user.role}</li>
          <li>{user._id}</li>
          <li>{user.token}</li>
        </ul>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
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
