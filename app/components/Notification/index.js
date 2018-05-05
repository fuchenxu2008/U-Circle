/**
*
* Notification
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Icon } from 'antd';
import './Notification.css';

function Notification({ info, currentUser, history, onReadNoti }) {
  const { created_at, fromUser, relatedQuestion } = info;
  const isOwner = currentUser._id === relatedQuestion.questioner._id;

  const _onClickNotification = () => {
    onReadNoti();
    history.push(`/question/${relatedQuestion._id}`);
  };

  return (
    <div className={`notification-card ${info.markRead ? 'seenNoti' : 'unreadNoti'}`} onClick={_onClickNotification}>
      <div className="notification-icon">
        <Icon type="notification" />
      </div>
      <div className="notification-info">
        <b className="notification-info-title">New Answer</b>
        <div>
          <span style={{ color: 'rgb(92, 176, 255)' }}>
            {fromUser.nickname}
          </span> answered {isOwner ? <span>
              your
            </span> : <span>{`${relatedQuestion.questioner.nickname}'s`}</span>} question: <span
              style={{ color: 'rgb(92, 176, 255)' }}
            >
              {relatedQuestion.title}
            </span>
        </div>
      </div>
      <div className="notification-time">{moment(created_at).fromNow()}</div>
    </div>
  );
}

Notification.propTypes = {
  currentUser: PropTypes.object,
  info: PropTypes.object,
  history: PropTypes.object,
  onReadNoti: PropTypes.func,
};

export default withRouter(Notification);
