import React from 'react';
import PropTypes from 'prop-types';
import NavMarkup from './NavMarkup';
import ResponsiveNav from './ResponsiveNav';

const NavBar = ({ currentUser, onLogOut }) => (
  <ResponsiveNav
    menuMarkup={NavMarkup}
    currentUser={currentUser}
    onLogOut={onLogOut}
    placement="bottomLeft"
  />
);

NavBar.propTypes = {
  currentUser: PropTypes.object,
  onLogOut: PropTypes.func,
};

export default NavBar;
