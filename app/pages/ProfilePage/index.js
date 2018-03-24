/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const user = this.props.currentUser;
    if (!user) return <Redirect to="/auth" />;
    return (
      <div>
        ProfilePage
        <h2>{user.nickname}</h2>
        <ul>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
          <li>ID: {user._id}</li>
          <li>Token: {user.token}</li>
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
