import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

const NavMarkup = ({ currentUser, onLogOut, mobileVersion }) => (
  <Menu
    mode={mobileVersion ? 'vertical' : 'horizontal'}
    className="mobile-navigation"
  >
    <Item key="home">
      <Link to="/">Home</Link>
    </Item>
    <Item key="alumni">
      <Link to="/alumni">Alumni</Link>
    </Item>
    <Item key="peer">
      <Link to="/peer">Peer</Link>
    </Item>
    {currentUser ? (
      <SubMenu title={currentUser.nickname}>
        <Item key="profile">
          <Link to="/me">Profile</Link>
        </Item>
        <Item key="logout">
          <div onClick={onLogOut}>Log Out</div>
        </Item>
      </SubMenu>
    ) : (
      <Item key="auth">
        <Link to="/auth">Login</Link>
      </Item>
    )}
  </Menu>
);

NavMarkup.propTypes = {
  onLogOut: PropTypes.func,
  currentUser: PropTypes.object,
  mobileVersion: PropTypes.bool,
};

NavMarkup.defaultProps = {
  mobileVersion: false,
};

export default NavMarkup;
