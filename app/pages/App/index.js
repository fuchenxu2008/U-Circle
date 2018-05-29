/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification, Icon } from 'antd';
import BackButton from 'components/BackButton';
import NavBar from 'components/NavBar';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import UserStuffPage from 'pages/UserStuffPage';
import AlumniPage from 'pages/AlumniPage';
import StudentPage from 'pages/StudentPage';
import NotificationPage from 'pages/NotificationPage';
import QuestionDetail from 'containers/QuestionDetail';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import { setCurrentUser, establishSocket, closeSocket, logOut, getNotifications, markNotiAsRead } from './actions';
import './App.css';

export class MainApp extends Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { currentUser, socket } = this.props;
    if (currentUser) {
      this.props.setCurrentUser(currentUser._id);
      this.props.getNotifications(currentUser._id);
      if (!socket) {
        this.listenSocket(currentUser._id);
      }
    }
  }

  componentWillReceiveProps(props) {  // Establish and listen socket on login/register
    const { currentUser, socket } = props;
    if (currentUser && !socket) {
      this.listenSocket(currentUser._id);
    }
  }

  onLogOut = () => {
    this.props.logOut();
    this.props.closeSocket(this.props.socket);
    this.props.history.push('/auth');
  }

  listenSocket = async id => {
    await this.props.establishSocket();
    const { socket } = this.props;
    socket.on('connect', () => {
      console.log('Socket Connected!');
      socket.on(id, data => {
        console.log('data: ', data);
        this.props.getNotifications(id);
        this.pushNotification(data);
      });
      socket.on('disconnect', () => {
        console.log('Socket Closed!');
      });
    });
  }

  pushNotification = data => {
    const { fromUser, relatedQuestion } = data;
    const { currentUser } = this.props;
    const notiKey = `open${Date.now()}`;
    const notiContent = (
      <p onClick={() => this._onClickNotification(relatedQuestion.id, notiKey)} className="notification-info-content">
        <b style={{ color: '#FDBE41' }}>{fromUser.nickname}</b> answered { currentUser._id === relatedQuestion.questioner._id
          ? <span>your</span>
          : <b style={{ color: '#FDBE41' }}>{`${relatedQuestion.questioner.nickname}'s`}</b>
        } {relatedQuestion.type} question: <b style={{ color: '#FDBE41' }}>{relatedQuestion.title}</b>
      </p>
    );
    notification.open({
      message: 'New Answer',
      description: notiContent,
      icon: <Icon type="bulb" style={{ color: '#108ee9' }} />,
      key: notiKey,
    });
  }

  _onClickNotification(questionId, notiKey) {
    const { currentUser, history } = this.props;
    this.props.markNotiAsRead({ userId: currentUser._id, questionId });
    history.push(`/question/${questionId}`);
    setTimeout(() => notification.close(notiKey), 2000);
  }

  render() {
    const { currentUser, notifications, history } = this.props;
    const { pathname } = history.location;
    const noBackBtnLocation = ['/', '/student', '/alumni'];

    return (
      <div className="page">
        <NavBar
          currentUser={currentUser}
          onLogOut={this.onLogOut}
          notiNum={notifications.filter(noti => noti.markRead === false).length}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={LoginPage} />
          <Route path="/user/:id/:type" component={UserStuffPage} />
          <Route path="/user/:id" component={ProfilePage} />
          <Route path="/alumni" component={AlumniPage} />
          <Route path="/student" component={StudentPage} />
          <Route path="/notification" component={NotificationPage} />
          <Route path="/question/:id" component={QuestionDetail} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        {
          !noBackBtnLocation.includes(pathname) &&
          <BackButton history={history} />
        }
      </div>
    );
  }
}

MainApp.propTypes = {
  history: PropTypes.object,
  setCurrentUser: PropTypes.func,
  establishSocket: PropTypes.func,
  closeSocket: PropTypes.func,
  getNotifications: PropTypes.func,
  markNotiAsRead: PropTypes.func,
  logOut: PropTypes.func,
  currentUser: PropTypes.object,
  socket: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  socket: state.get('global').get('socket'),
  notifications: state.get('global').get('notifications').toJS(),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: id => dispatch(setCurrentUser(id)),
  establishSocket: () => dispatch(establishSocket()),
  closeSocket: socket => dispatch(closeSocket(socket)),
  getNotifications: id => dispatch(getNotifications(id)),
  markNotiAsRead: noti => dispatch(markNotiAsRead(noti)),
  logOut: () => dispatch(logOut()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainApp)
);
