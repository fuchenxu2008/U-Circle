import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavMarkup from './NavMarkup';
import ResponsiveNav from './ResponsiveNav';

const NavBar = ({ currentUser }) => (
  <ResponsiveNav
    menuMarkup={NavMarkup}
    currentUser={currentUser}
    placement="bottomLeft"
  />
);

NavBar.propTypes = {
  currentUser: PropTypes.object,
};


const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
});

export default connect(mapStateToProps)(NavBar);
