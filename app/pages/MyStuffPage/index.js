/**
 *
 * MyStuffPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { mapKeys } from 'lodash';
import QuestionList from 'components/QuestionsList';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { subscribeQuestion } from '../StudentPage/actions';

export class MyStuffPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubscribeQuestion = ({ userId, questionId }) => {
    this.props.subscribeQuestion({ userId, questionId });
  }

  render() {
    const { match, currentUser } = this.props;
    const type = match.params.type;
    const typeMapping = {
      questions: 'myQuestions',
      answers: 'myAnswers',
      subscriptions: 'mySubscriptions',
    };

    const myStuffList = type in typeMapping
      ? (
        <QuestionList
          questions={mapKeys(this.props[typeMapping[type]], '_id')}
          onSubscribeQuestion={this.handleSubscribeQuestion}
          currentUser={currentUser}
        />
      )
      : null;

    return (
      <div>
        <Helmet>
          <title>MyStuffPage</title>
          <meta name="description" content="Description of MyStuffPage" />
        </Helmet>
        <div className="body-container">
          MyStuffPage
          {myStuffList}
        </div>
      </div>
    );
  }
}

MyStuffPage.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object,
  subscribeQuestion: PropTypes.func,
  // myQuestions: PropTypes.arrayOf(PropTypes.object),
  // myAnswers: PropTypes.arrayOf(PropTypes.object),
  // mySubscriptions: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  myQuestions: state.get('myStuffPage').get('myQuestions').toJS(),
  myAnswers: state.get('myStuffPage').get('myAnswers').toJS(),
  mySubscriptions: state.get('myStuffPage').get('mySubscriptions').toJS(),
  currentUser:
    state.get('global').get('currentUser') === null ?
    null :
    state.get('global').get('currentUser').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    subscribeQuestion: info => dispatch(subscribeQuestion(info)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'myStuffPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(MyStuffPage);
