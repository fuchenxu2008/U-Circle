/**
 *
 * AlumniPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

export class AlumniPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AlumniPage</title>
          <meta name="description" content="Description of AlumniPage" />
        </Helmet>
        <h2>AlumniPage</h2>
      </div>
    );
  }
}

AlumniPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alumnipage: state,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'alumniPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(AlumniPage);
