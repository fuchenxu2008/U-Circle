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
import { Icon } from 'antd';
import { sortBy, map } from 'lodash';
import QuestionList from 'components/QuestionsList';
import MyAnswer from 'components/MyAnswer';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getMyStuff, subscribeQuestion } from './actions';
export class MyStuffPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    pageType: '',
    typeMapping: {
      questions: 'myQuestions',
      answers: 'myAnswers',
      subscriptions: 'mySubscriptions',
    },
  }

  componentWillMount() {
    const { match, currentUser, history } = this.props;
    const { type } = match.params;
    if (currentUser) {
      if (type in this.state.typeMapping) {
        this.props.getMyStuff({ id: currentUser._id, type });
        this.setState({
          pageType: `My ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        });
      } else history.push('/me');
    } else history.push('/auth');
  }

  handleSubscribeQuestion = ({ userId, questionId }) => {
    this.props.subscribeQuestion({ userId, questionId });
  }

  render() {
    const { match, currentUser } = this.props;
    const { type } = match.params;
    const { typeMapping, pageType } = this.state;

    const myStuffList = type === 'answers'
      ? map(sortBy(this.props[typeMapping[type]], 'created_at').reverse(), answer => (
        <MyAnswer key={answer._id} answer={answer} />
      ))
      : (
        <QuestionList
          questions={this.props[typeMapping[type]]}
          onSubscribeQuestion={this.handleSubscribeQuestion}
          currentUser={currentUser}
        />
    );

    return (
      <div>
        <Helmet>
          <title>MyStuffPage</title>
          <meta name="description" content="Description of MyStuffPage" />
        </Helmet>
        <div className="body-container">
          <h2 className="big-title">{pageType}</h2>
          {
            Object.keys(this.props[typeMapping[type]]).length
              ? myStuffList
              : <div className="no-match-found"><Icon type="bulb" /> No {type} available.</div>
          }
        </div>
      </div>
    );
  }
}

MyStuffPage.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object,
  subscribeQuestion: PropTypes.func,
  getMyStuff: PropTypes.func,
  history: PropTypes.object,
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
    getMyStuff: ({ id, type }) => dispatch(getMyStuff({ id, type })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'myStuffPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(MyStuffPage);
