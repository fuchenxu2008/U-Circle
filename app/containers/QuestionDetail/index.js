/**
 *
 * QuestionDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectQuestionDetail from './selectors';
import reducer from './reducer';

export class QuestionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      
      </div>
    );
  }
}

QuestionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  questiondetail: makeSelectQuestionDetail(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'questionDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(QuestionDetail);
