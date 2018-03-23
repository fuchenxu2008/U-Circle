/**
 *
 * NavBar
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

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
          this.props.currentUser ? (
            <SubMenu title={this.props.currentUser.nickname}>
              <Item key="profile">
                <Link to="/me">Profile</Link>
              </Item>
              <Item key="logout">
                <text onClick={this.props.onLogOut}>Log Out</text>
              </Item>
            </SubMenu>
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
  onLogOut: PropTypes.func,
};

export default NavBar;
