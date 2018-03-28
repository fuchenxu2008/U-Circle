/**
 *
 * ActivityPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectActivityPage from './selectors';
import reducer from './reducer';

export class ActivityPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ActivityPage</title>
          <meta name="description" content="Description of ActivityPage" />
        </Helmet>
        ActivityPage
      </div>
    );
  }
}

ActivityPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activitypage: makeSelectActivityPage(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'activityPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ActivityPage);
