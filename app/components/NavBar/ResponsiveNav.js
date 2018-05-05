/**
 *
 * ResponsiveNav
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { Link } from 'react-router-dom';
import { Popover, Icon, Menu } from 'antd';
import './ResponsiveNavStyle.css';

const Item = Menu.Item;

class ResponsiveNav extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    viewportWidth: 0,
    menuVisible: false,
  };

  componentDidMount() {
    this.saveViewportDimensions();
    window.addEventListener('resize', this.saveViewportDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions);
  }

  handleMenuVisibility = menuVisible => {
    this.setState({ menuVisible });
  };

  saveViewportDimensions = throttle(() => {
    this.setState({
      viewportWidth: window.innerWidth,
    });
  }, this.props.applyViewportChange);

  render() {
    const { menuMarkup, mobileBreakPoint, currentUser, onLogOut, notiNum, location } = this.props;
    const MenuMarkup = menuMarkup;
    if (this.state.viewportWidth > mobileBreakPoint) {
      return <MenuMarkup currentUser={currentUser} onLogOut={onLogOut} notiNum={notiNum} />;
    }

    return (
      <Menu mode="horizontal" className={`mobile-navbar container ${location === '/' && 'transparent-bar'}`}>
        <Item key="logo">
          <Link to="/"><p className="logo-brand">U-CIRCLE</p></Link>
        </Item>
        <Item key="more" className="mobile-navbar-collapse">
          <Popover
            content={
              <MenuMarkup
                currentUser={this.props.currentUser}
                notiNum={this.props.notiNum}
                onLogOut={this.props.onLogOut}
                onLinkClick={() => this.handleMenuVisibility(false)}
                mobileVersion
              />
            }
            trigger="click"
            placement={this.props.placement}
            visible={this.state.menuVisible}
            onVisibleChange={this.handleMenuVisibility}
          >
            <Icon className="iconHamburger" type="menu" />
          </Popover>
        </Item>
      </Menu>
    );
  }
}

ResponsiveNav.propTypes = {
  currentUser: PropTypes.object,
  notiNum: PropTypes.number,
  onLogOut: PropTypes.func,
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  placement: PropTypes.string,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  location: PropTypes.string,
};

ResponsiveNav.defaultProps = {
  mobileBreakPoint: 575,
  applyViewportChange: 250,
  placement: 'bottomRight',
};

export default ResponsiveNav;
