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
import { getMyQuestions, getMyAnswers } from './actions';
import './ProfilePage.css';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.props.getMyQuestions(currentUser._id);
      this.props.getMyAnswers(currentUser._id);
    }
  }

  render() {
    const { currentUser, myQuestions, myAnswers } = this.props;
    if (!currentUser) return <Redirect to="/auth" />;

    const myQuestionsList = myQuestions.map(question => <MyQuestion key={question._id} question={question} />);
    const myAnswersList = myAnswers.map(answer => <MyAnswer key={answer._id} answer={answer} />);

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
                <span>1</span>
              </li>
              <li className="profile-list-item">
                <Icon type="solution" className="profile-list-item-icon" /><br />
                <small>Answers</small><br />
                <span>1</span>
              </li>
              <li className="profile-list-item">
                <Icon type="notification" className="profile-list-item-icon" /><br />
                <small>Alerts</small><br />
                <span>1</span>
              </li>
              <li className="profile-list-item">
                <Icon type="star-o" className="profile-list-item-icon" /><br />
                <small>Subscribed</small><br />
                <span>1</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-detail-container">
          <div className="profile-about">
            <h3>MY QUESTIONS</h3>
            {myQuestionsList}
          </div>
          <div className="profile-my-questions">
            <h3>MY ANSWERS</h3>
            {myAnswersList}
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  myQuestions: PropTypes.arrayOf(PropTypes.object),
  myAnswers: PropTypes.arrayOf(PropTypes.object),
  getMyQuestions: PropTypes.func,
  getMyAnswers: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  myQuestions: state.get('profilePage').get('myQuestions').toJS(),
  myAnswers: state.get('profilePage').get('myAnswers').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMyQuestions: id => dispatch(getMyQuestions(id)),
    getMyAnswers: id => dispatch(getMyAnswers(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ProfilePage);
