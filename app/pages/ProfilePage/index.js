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
import AvatarUploader from 'containers/AvatarUploader';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import './ProfilePage.css';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const user = this.props.currentUser;
    if (!user) return <Redirect to="/auth" />;
    return (
      <div>
        <h2>ProfilePage</h2>
        <div className="profile-avatar-container">
          <AvatarUploader />
        </div>
        <ul>
          <li>Nickname: {user.nickname}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
          <li><b>Credit: {user.credit}</b></li>
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
