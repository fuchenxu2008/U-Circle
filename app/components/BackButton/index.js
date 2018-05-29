/**
*
* BackButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import './BackButton.css';

export class BackButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { scrollY: 0, backbtnClass: 'slideInUp' }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY - this.state.scrollY > 20) {
      this.setState({ backbtnClass: 'slideOutDown' });
    } else if (this.state.scrollY - window.scrollY > 20) {
      this.setState({ backbtnClass: 'slideInUp' });
    }
    this.setState({ scrollY: window.scrollY });
  }

  render() {
    return (
      <Button
        className={`back-btn animated ${this.state.backbtnClass}`}
        onClick={() => this.props.history.go(-1)}
      ><Icon type="arrow-left" />
      </Button>
    );
  }
}

BackButton.propTypes = {
  history: PropTypes.object,
};

export default BackButton;
