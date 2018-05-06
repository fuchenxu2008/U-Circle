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
import SearchBar from 'containers/SearchBar';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

export class AlumniPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="body-container">
        <Helmet>
          <title>AlumniPage</title>
          <meta name="description" content="Description of AlumniPage" />
        </Helmet>
        <SearchBar searchType="occupational" />
        <br />
        <h2 className="big-title">Alumni Page</h2>
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
