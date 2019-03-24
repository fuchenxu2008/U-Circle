/**
 *
 * NotificationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Icon } from 'antd';
import Notification from 'components/Notification';
import { markNotiAsRead } from '../App/actions';
import './NotificationPage.css';

export class NotificationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { notifications, currentUser } = this.props;
    if (!currentUser) return <Redirect to="/auth" />;
    const myNotifications = notifications.map(noti => (
      <Notification
        key={noti._id}
        info={noti}
        currentUser={currentUser}
        onReadNoti={() => this.props.markNotiAsRead({ userId: currentUser._id, questionId: noti.relatedQuestion._id })}
      />
    ));

    return (
      <div className="body-container">
        <Helmet>
          <title>Notification Center</title>
          <meta name="description" content="Description of NotificationCenter" />
        </Helmet>
        <h2 className="big-title mb-20">Notification Center</h2>
        {
          notifications.length
            ? myNotifications
            : <div className="no-match-found"><Icon type="notification" /> No notification available.</div>
        }
      </div>
    );
  }
}

NotificationPage.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object,
  markNotiAsRead: PropTypes.func,
};

const mapStateToProps = state => ({
  notifications: state.get('global').get('notifications').toJS(),
  currentUser: state.get('global').get('currentUser') === null
    ? null
    : state.get('global').get('currentUser').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    markNotiAsRead: noti => dispatch(markNotiAsRead(noti)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
