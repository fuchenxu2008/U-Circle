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
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from 'containers/NavBar';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import AlumniPage from 'pages/AlumniPage';
import PeerPage from 'pages/PeerPage';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import { setCurrentUser } from './actions';
import './App.css';

class MainApp extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const user = localStorage.getItem('currentUser') || null;
    if (user) this.props.setCurrentUser(JSON.parse(user));
  }

  render() {
    const nickname = this.props.currentUser.nickname || false;
    return (
      <div>
        <NavBar />
        <h1 className="userStat">{ nickname && nickname }</h1>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={LoginPage} />
          <Route path="/me" component={ProfilePage} />
          <Route path="/alumni" component={AlumniPage} />
          <Route path="/peer" component={PeerPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

MainApp.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
