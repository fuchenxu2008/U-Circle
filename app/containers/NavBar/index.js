/**
 *
 * NavBar
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import injectReducer from 'utils/injectReducer';
import makeSelectNavBar from './selectors';
import reducer from './reducer';

const Item = Menu.Item;

class NavBar extends Component {  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Menu mode="horizontal">
        <Item key="home">
          <Link to="/">HomePage</Link>
        </Item>
        <Item key="alumni">
          <Link to="/alumni">Alumni</Link>
        </Item>
        <Item key="peer">
          <Link to="/peer">Peer</Link>
        </Item>
        <Item key="auth">
          <Link to="/auth">Login</Link>
        </Item>
        <Item key="profile">
          <Link to="/me">Profile</Link>
        </Item>
      </Menu>
    );
  }
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
