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
        {
          this.props.currentUser.token ? (
            <Item key="profile">
              <Link to="/me">{this.props.currentUser.nickname}</Link>
            </Item>
          ) : (
            <Item key="auth">
              <Link to="/auth">Login</Link>
            </Item>
          )
        }
      </Menu>
    );
  }
}

NavBar.propTypes = {
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

const withReducer = injectReducer({ key: 'navbar', reducer });

export default compose(
  withReducer,
  withConnect,
)(NavBar);
