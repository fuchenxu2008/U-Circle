/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Icon, Button } from 'antd';
import AvatarUploader from 'containers/AvatarUploader';
import NewQuestionForm from 'components/NewQuestionForm';
import MyQuestion from 'components/MyQuestion';
import MyAnswer from 'components/MyAnswer';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getUserQuestions, getUserAnswers, getUserSubscription, getUserInfo, clearProfilePage } from './actions';
import './ProfilePage.css';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { showAddForm: false, showHint: false };

  componentWillMount() {
    const { currentUser, match } = this.props;
    const { id } = match.params;
    if (currentUser) {
      this.props.getUserInfo(id);
      this.props.getUserQuestions(id);
      this.props.getUserAnswers(id);
      this.props.getUserSubscription(id);
    }
  }

  componentWillUnmount() {
    this.props.clearProfilePage();
  }

  showForm = () => {
    if (this.props.currentUser) {
      this.setState({ showAddForm: true });
    } else {
      this.setState({ showHint: true });
    }
  }
  hideForm = () => this.setState({ showAddForm: false, showHint: false });

  render() {
    const { currentUser, user, userQuestions, userAnswers, userSubscriptions, notifications, history } = this.props;
    if (!currentUser) return <Redirect to="/auth" />;
    if (!user) return null;
    const { _id, role, nickname } = user;
    const isCurrentUser = _id === currentUser._id;
    const isAlumni = role === 'alumni';
    const userQuestionsList = userQuestions.slice(0, 3).map(question => <MyQuestion key={question._id} question={question} />);
    const userAnswersList = userAnswers.slice(0, 3).map(answer => <MyAnswer key={answer._id} answer={answer} />);
    const userSubscriptionsList = userSubscriptions.slice(0, 3).map(subQuestion => <MyQuestion key={subQuestion._id} question={subQuestion} />);

    return (
      <div>
        <Helmet>
          <title>ProfilePage</title>
          <meta name="description" content="Description of NotificationCenter" />
        </Helmet>
        <div className="profile-bg">
          <div className="profile-upper-container">
            <div className="profile-avatar-container">
              <AvatarUploader avatar={isCurrentUser ? currentUser.avatar : user.avatar} disabled={!isCurrentUser} />
            </div>
            <h3 className="profile-name">{nickname}<span className="role-tag">{role.charAt(0).toUpperCase()}</span></h3>
            { isCurrentUser && !isAlumni &&  // Student's own profile
              <ul className="profile-list">
                <li className="profile-list-item" onClick={() => history.push(`/user/${_id}/questions`)}>
                  <Icon type="question-circle-o" className="profile-list-item-icon" /><br />
                  <small>Questions</small><br />
                  <span>{userQuestions.length}</span>
                </li>
                <li className="profile-list-item" onClick={() => history.push(`/user/${_id}/answers`)}>
                  <Icon type="solution" className="profile-list-item-icon" /><br />
                  <small>Answers</small><br />
                  <span>{userAnswers.length}</span>
                </li>
                <li className="profile-list-item" onClick={() => history.push('/notification')}>
                  <Icon type="notification" className="profile-list-item-icon" /><br />
                  <small>Alerts</small><br />
                  <span>{notifications.filter(noti => !noti.markRead).length}</span>
                </li>
                <li className="profile-list-item" onClick={() => history.push(`/user/${_id}/subscriptions`)}>
                  <Icon type="star-o" className="profile-list-item-icon" /><br />
                  <small>Subscribed</small><br />
                  <span>{userSubscriptions.length}</span>
                </li>
              </ul>
            }
            { isCurrentUser && isAlumni &&  // Alumni's own profile
              <div className="private-asking">
                <Button ghost className="ask-btn" onClick={this.showForm}>Questions For You</Button>
              </div>
            }
            { !isCurrentUser && isAlumni && // Other alumni's profile
              <div className="private-asking">
                <Button ghost className="ask-btn" onClick={this.showForm}>Ask Questions</Button>
                <NewQuestionForm
                  visible={this.state.showAddForm}
                  onCancel={this.hideForm}
                  onOk={this.hideForm}
                  onAddQuestion={this.handleAddQuestion}
                  type="occupational"
                  currentUser={currentUser}
                />
              </div>
            }
          </div>
        </div>
        <div className="profile-detail-container">
          <div className="profile-my-questions">
            <div className="profile-detail-title-row">
              <h4 className="profile-detail-title">{ isCurrentUser ? 'MY' : (isAlumni ? 'ANSWERED' : '') } QUESTIONS</h4>
              <Button className="borderless-btn" onClick={() => history.push(`/user/${_id}/questions`)}>See All &gt;</Button>
            </div>
            {userQuestionsList}
          </div>
          { isCurrentUser &&
            <div>
              <div className="profile-my-answers">
                <div className="profile-detail-title-row">
                  <h4 className="profile-detail-title">MY ANSWERS</h4>
                  <Button className="borderless-btn" onClick={() => history.push(`/user/${_id}/answers`)}>See All &gt;</Button>
                </div>
                {userAnswersList}
              </div>
              <div className="profile-my-answers">
                <div className="profile-detail-title-row">
                  <h4 className="profile-detail-title">MY SUBSCRIPTIONS</h4>
                  <Button className="borderless-btn" onClick={() => history.push(`/user/${_id}/subscriptions`)}>See All &gt;</Button>
                </div>
                {userSubscriptionsList}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  userQuestions: PropTypes.arrayOf(PropTypes.object),
  userAnswers: PropTypes.arrayOf(PropTypes.object),
  userSubscriptions: PropTypes.arrayOf(PropTypes.object),
  getUserInfo: PropTypes.func,
  getUserSubscription: PropTypes.func,
  getUserQuestions: PropTypes.func,
  getUserAnswers: PropTypes.func,
  clearProfilePage: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  user:
    state.get('profilePage').get('user') === null ?
      null :
      state.get('profilePage').get('user').toJS(),
  notifications: state.get('global').get('notifications').toJS(),
  userQuestions: state.get('profilePage').get('userQuestions').toJS(),
  userAnswers: state.get('profilePage').get('userAnswers').toJS(),
  userSubscriptions: state.get('profilePage').get('userSubscriptions').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: id => dispatch(getUserInfo(id)),
    getUserQuestions: id => dispatch(getUserQuestions(id)),
    getUserAnswers: id => dispatch(getUserAnswers(id)),
    getUserSubscription: id => dispatch(getUserSubscription(id)),
    clearProfilePage: () => dispatch(clearProfilePage()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ProfilePage);
