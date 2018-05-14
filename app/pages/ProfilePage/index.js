/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import AvatarUploader from 'containers/AvatarUploader';
import MyQuestion from 'components/MyQuestion';
import MyAnswer from 'components/MyAnswer';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getMyQuestions, getMyAnswers, getMySubscription } from './actions';
import './ProfilePage.css';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.props.getMyQuestions(currentUser._id);
      this.props.getMyAnswers(currentUser._id);
      this.props.getMySubscription(currentUser._id);
    }
  }

  render() {
    const { currentUser, myQuestions, myAnswers, mySubscription, notifications, history } = this.props;
    if (!currentUser) return <Redirect to="/auth" />;

    const myQuestionsList = myQuestions.slice(0, 3).map(question => <MyQuestion key={question._id} question={question} />);
    const myAnswersList = myAnswers.slice(0, 3).map(answer => <MyAnswer key={answer._id} answer={answer} />);

    return (
      <div>
        <div className="profile-bg">
          <div className="profile-upper-container">
            <div className="profile-avatar-container">
              <AvatarUploader />
            </div>
            <h3 className="profile-name">{currentUser.nickname}</h3>
            <ul className="profile-list">
              <li className="profile-list-item">
                <Icon type="question-circle-o" className="profile-list-item-icon" /><br />
                <small>Questions</small><br />
                <span>{myQuestions.length}</span>
              </li>
              <li className="profile-list-item">
                <Icon type="solution" className="profile-list-item-icon" /><br />
                <small>Answers</small><br />
                <span>{myAnswers.length}</span>
              </li>
              <li className="profile-list-item" onClick={() => history.push('/notification')}>
                <Icon type="notification" className="profile-list-item-icon" /><br />
                <small>Alerts</small><br />
                <span>{notifications.filter(noti => !noti.markRead).length}</span>
              </li>
              <li className="profile-list-item">
                <Icon type="star-o" className="profile-list-item-icon" /><br />
                <small>Subscribed</small><br />
                <span>{mySubscription.length}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-detail-container">
          <div className="profile-my-questions">
            <div className="profile-detail-title-row">
              <h3>MY QUESTIONS</h3>
              <div>See All &gt;</div>
            </div>
            {myQuestionsList}
          </div>
          <div className="profile-my-answers">
            <div className="profile-detail-title-row">
              <h3>MY ANSWERS</h3>
              <div>See All &gt;</div>
            </div>
            {myAnswersList}
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object),
  myQuestions: PropTypes.arrayOf(PropTypes.object),
  myAnswers: PropTypes.arrayOf(PropTypes.object),
  mySubscription: PropTypes.arrayOf(PropTypes.object),
  getMySubscription: PropTypes.func,
  getMyQuestions: PropTypes.func,
  getMyAnswers: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  notifications: state.get('global').get('notifications').toJS(),
  myQuestions: state.get('profilePage').get('myQuestions').toJS(),
  myAnswers: state.get('profilePage').get('myAnswers').toJS(),
  mySubscription: state.get('profilePage').get('mySubscription').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMyQuestions: id => dispatch(getMyQuestions(id)),
    getMyAnswers: id => dispatch(getMyAnswers(id)),
    getMySubscription: id => dispatch(getMySubscription(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ProfilePage);
