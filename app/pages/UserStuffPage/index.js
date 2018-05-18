/**
 *
 * UserStuffPage
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
import { getUserStuff, subscribeQuestion } from './actions';
export class UserStuffPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    pageType: '',
    typeMapping: {
      questions: 'userQuestions',
      answers: 'userAnswers',
      subscriptions: 'userSubscriptions',
    },
  }

  componentWillMount() { /* eslint consistent-return: 0 */
    const { match, currentUser, history } = this.props;
    const { type, id } = match.params;
    const isCurrentUser = id === currentUser._id;
    if ((type === 'answers' || type === 'subscription') && !isCurrentUser) return history.push(`/user/${id}`);
    if (currentUser) {
      if (type in this.state.typeMapping) {
        this.props.getUserStuff({ id, type });
        this.setState({
          pageType: `${isCurrentUser ? 'My' : 'User'} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        });
      } else return history.push(`/user/${id}`);
    } else history.push('/auth');
  }

  handleSubscribeQuestion = ({ userId, questionId }) => {
    this.props.subscribeQuestion({ userId, questionId });
  }

  render() {
    const { match, currentUser } = this.props;
    const { type } = match.params;
    const { typeMapping, pageType } = this.state;

    const userStuffList = type === 'answers'
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
          <title>User{type.charAt(0).toUpperCase() + type.slice(1)}Page</title>
          <meta name="description" content="Description of UserStuffPage" />
        </Helmet>
        <div className="body-container">
          <h2 className="big-title">{pageType}</h2>
          {
            Object.keys(this.props[typeMapping[type]]).length
              ? userStuffList
              : <div className="no-match-found"><Icon type="bulb" /> No {type} available.</div>
          }
        </div>
      </div>
    );
  }
}

UserStuffPage.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object,
  subscribeQuestion: PropTypes.func,
  getUserStuff: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  userQuestions: state.get('userStuffPage').get('userQuestions').toJS(),
  userAnswers: state.get('userStuffPage').get('userAnswers').toJS(),
  userSubscriptions: state.get('userStuffPage').get('userSubscriptions').toJS(),
  currentUser:
    state.get('global').get('currentUser') === null ?
    null :
    state.get('global').get('currentUser').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    subscribeQuestion: info => dispatch(subscribeQuestion(info)),
    getUserStuff: ({ id, type }) => dispatch(getUserStuff({ id, type })),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userStuffPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(UserStuffPage);
