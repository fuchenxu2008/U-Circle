/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Button } from 'antd';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import './HomePage.css';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    bgStyle: '',
  }

  componentDidMount() {
    this.saveViewportDimensions();
    window.addEventListener('resize', this.saveViewportDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions);
  }

  onGetStarted = () => {
    this.props.history.push('/auth');
  }

  saveViewportDimensions = throttle(() => {
    this.setState({ bgStyle: document.body.clientWidth / document.body.clientHeight > 0.8 ? 'wideSize' : 'narrowSize' });
  }, 250);

  render() {
    return (
      <div className="body-container">
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <div className="homepage" />
        <div className="home-banner">
          <h1 className="home-banner-title">U-CIRCLE</h1>
          <p>
            This platform is dedicated to answering your enquirers regarding
            academic studies and occupational queries. Share your questions
            and answers with our alumni and students.{' '}
          </p>
        </div>
        <div className="bottom-section">
          <Button type="primary" size="large" className="start-btn" onClick={this.onGetStarted}>
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  homepage: state,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
