/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import './HomePage.css';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const firstSection = (
      <section>
        {/* Brand */}
        <div>
          <h1>U-CIRCLE</h1>
        </div>
        {/* Stripe photo */}
        <div>
        </div>
        {/* Info */}
        <div>
          <div>DEVELOPMENT</div>
          <div>DEVELOPMENT
          ZIPL STUDIO IS A HIGH-QUALIFIED TEAM OF TALENTED DEVELOPERS AND DESIGNERS.
          EVERY PROJECT IS A CHALLENGE TO DO BETTER THAT ALL WE HAVE ALREADY DONE!
          </div>
          <div>9+ AWARDS</div>
        </div>
      </section>
    );

    return (
      <div>
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        {firstSection}
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
