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
    const MenuMarkup = this.props.menuMarkup;

    if (this.state.viewportWidth > this.props.mobileBreakPoint) {
      return <MenuMarkup currentUser={this.props.currentUser} />;
    }

    return (
      <Menu mode="horizontal" className="mobile-navbar container">
        <Item key="logo">
          <Link to="/">U-CIRCLE</Link>
        </Item>
        <Item key="more" className="mobile-navbar-collapse">
          <Popover
            content={
              <MenuMarkup
                currentUser={this.props.currentUser}
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
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  placement: PropTypes.string,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

ResponsiveNav.defaultProps = {
  mobileBreakPoint: 575,
  applyViewportChange: 250,
  placement: 'bottom',
};

export default ResponsiveNav;