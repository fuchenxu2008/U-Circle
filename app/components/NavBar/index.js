/**
 *
 * NavBar
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class NavBar extends Component {  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { currentUser } = this.props;
    return (
      <Menu mode="horizontal">
        <Item key="home">
          <Link to="/">Home</Link>
        </Item>
        <Item key="alumni">
          <Link to="/alumni">Alumni</Link>
        </Item>
        <Item key="peer">
          <Link to="/peer">Peer</Link>
        </Item>
        {
          currentUser ? (
            <SubMenu title={currentUser.nickname}>
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
  onLogOut: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
});

export default connect(mapStateToProps)(NavBar);
