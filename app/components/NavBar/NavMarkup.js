import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

const NavMarkup = ({ currentUser, onLogOut, mobileVersion, notiNum }) => (
  <Menu
    mode={mobileVersion ? 'vertical' : 'horizontal'}
    className="mobile-navigation"
  >
    {
      !mobileVersion &&
      <Item key="logo">
        <Link to="/" className="logo-brand">U-CIRCLE</Link>
      </Item>
    }
    <Item key="home">
      <Link to="/"><Icon type="home" />Home</Link>
    </Item>
    <Item key="alumni">
      <Link to="/alumni"><Icon type="compass" />Alumni</Link>
    </Item>
    <Item key="student">
      <Link to="/student"><Icon type="bulb" />Student</Link>
    </Item>
    {currentUser &&
      <Item key="notification">
        <Link to="/notification">
          <Badge count={notiNum}>
            <Icon type="notification" />Notification
          </Badge>
        </Link>
      </Item>
    }
    {currentUser ? (
      <SubMenu key="user" title={<span><Icon type="user" />{currentUser.nickname}</span>}>
        <Item key="profile">
          <Link to="/me"><Icon type="profile" />Profile</Link>
        </Item>
        <Item key="logout">
          <div onClick={onLogOut}><Icon type="logout" />Log Out</div>
        </Item>
      </SubMenu>
    ) : (
      <Item key="auth">
        <Link to="/auth"><Icon type="login" />Login</Link>
      </Item>
    )}
  </Menu>
);

NavMarkup.propTypes = {
  onLogOut: PropTypes.func,
  currentUser: PropTypes.object,
  mobileVersion: PropTypes.bool,
  notiNum: PropTypes.number,
};

NavMarkup.defaultProps = {
  mobileVersion: false,
};

export default NavMarkup;
