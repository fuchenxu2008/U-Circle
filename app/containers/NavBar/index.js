/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import makeSelectNavBar from './selectors';
import reducer from './reducer';

function NavBar() {
  return (
    <div>
      <ul>
        <li><Link to="/">HomePage</Link></li>
        <li><Link to="/alumni">Alumni</Link></li>
        <li><Link to="/peer">Peer</Link></li>
        <li><Link to="/auth">Login</Link></li>
        <li><Link to="/me">Profile</Link></li>
      </ul>
    </div>
  );
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navbar: makeSelectNavBar(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'navbar', reducer });

export default compose(
  withReducer,
  withConnect,
)(NavBar);
