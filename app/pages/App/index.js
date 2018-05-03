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
import NavBar from 'components/NavBar';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import AlumniPage from 'pages/AlumniPage';
import PeerPage from 'pages/PeerPage';
import QuestionDetail from 'containers/QuestionDetail';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import { setCurrentUser, establishSocket, closeSocket, logOut } from './actions';
import './App.css';

class MainApp extends Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { currentUser, socket } = this.props;
    if (currentUser) {
      this.props.setCurrentUser(currentUser._id);
      if (!socket) {
        this.listenSocket(currentUser._id);
      }
    }
  }

  componentWillReceiveProps(props) {
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
        this.pushNotification(data);
      });
      socket.on('disconnect', () => {
        console.log('Socket Closed!');
      });
    });
  }

  pushNotification = data => {
    const notiContent = <p onClick={() => { this.props.history.push(`/question/${data.questionId}`); }}><b style={{ color: '#FDBE41' }}>{data.answerer}</b> answered your question: <b style={{ color: '#FDBE41' }}>{data.title}</b></p>;
    notification.open({
      message: 'New Answer',
      description: notiContent,
      icon: <Icon type="bulb" style={{ color: '#108ee9' }} />,
      onClose: () => console.log('noti closed'),
    });
  }

  render() {
    return (
      <div className="page">
        <NavBar
          currentUser={this.props.currentUser}
          onLogOut={this.onLogOut}
          // notification={}
        />
        <div className="body-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/auth" component={LoginPage} />
            <Route path="/me" component={ProfilePage} />
            <Route path="/alumni" component={AlumniPage} />
            <Route path="/peer" component={PeerPage} />
            <Route path="/question/:id" component={QuestionDetail} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

MainApp.propTypes = {
  history: PropTypes.object,
  setCurrentUser: PropTypes.func,
  establishSocket: PropTypes.func,
  closeSocket: PropTypes.func,
  logOut: PropTypes.func,
  currentUser: PropTypes.object,
  socket: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  socket: state.get('global').get('socket'),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: id => dispatch(setCurrentUser(id)),
  establishSocket: () => dispatch(establishSocket()),
  closeSocket: socket => dispatch(closeSocket(socket)),
  logOut: () => dispatch(logOut()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainApp)
);
