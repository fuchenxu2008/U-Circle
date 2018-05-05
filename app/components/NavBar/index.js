import React from 'react';
import PropTypes from 'prop-types';
import NavMarkup from './NavMarkup';
import ResponsiveNav from './ResponsiveNav';

const NavBar = ({ currentUser, onLogOut, notiNum }) => (
  <ResponsiveNav
    menuMarkup={NavMarkup}
    currentUser={currentUser}
    notiNum={notiNum}
    onLogOut={onLogOut}
    placement="bottomLeft"
  />
);

NavBar.propTypes = {
  currentUser: PropTypes.object,
  onLogOut: PropTypes.func,
  notiNum: PropTypes.number,
};

export default NavBar;
