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
import NavBar from 'components/NavBar';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import AlumniPage from 'pages/AlumniPage';
import PeerPage from 'pages/PeerPage';
import QuestionDetail from 'containers/QuestionDetail';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import { setCurrentUser, logOut } from './actions';
import { getCurrentUser } from '../../authMiddleware';
import './App.css';

class MainApp extends Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (getCurrentUser()) {
      this.props.setCurrentUser();
    }
  }

  onLogOut = () => {
    this.props.logOut();
    this.props.history.push('/auth');
  }

  render() {
    return (
      <div>
        <NavBar onLogOut={this.onLogOut} />
        <div className="container">
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
  logOut: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser').toJS(),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: () => dispatch(setCurrentUser()),
  logOut: () => dispatch(logOut()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainApp)
);
