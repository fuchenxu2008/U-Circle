import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavMarkup from './NavMarkup';
import ResponsiveNav from './ResponsiveNav';

export const NavBar = ({ currentUser, onLogOut, notiNum, history }) => (
  <ResponsiveNav
    menuMarkup={NavMarkup}
    currentUser={currentUser}
    notiNum={notiNum}
    onLogOut={onLogOut}
    location={history.location.pathname}
  />
);

NavBar.propTypes = {
  currentUser: PropTypes.object,
  onLogOut: PropTypes.func,
  notiNum: PropTypes.number,
  history: PropTypes.object,
};

export default withRouter(NavBar);
