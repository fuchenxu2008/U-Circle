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
import './ProfilePage.css';
import avatar from '../../assets/user.png';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const user = this.props.currentUser;
    if (!user) return <Redirect to="/auth" />;
    return (
      <div>
        <h2>ProfilePage</h2>
        <div className="profile-avatar-container">
          <img src={avatar} alt="avatar" className="profile-avatar" />
        </div>
        <ul>
          <li>Nickname: {user.nickname}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
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
