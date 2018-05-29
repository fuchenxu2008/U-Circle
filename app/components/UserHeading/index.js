/**
*
* UserHeading
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import './UserHeading.css';

export function UserHeading({ avatar, nickname, time, onClick }) {
  return (
    <div className="user-heading">
      <Avatar className="user-heading-avatar" src={avatar} onClick={onClick} />
      <div className="user-heading-info">
        <div className="user-heading-nickname">{nickname}</div>
        <small className="question-time">{time}</small>
      </div>
    </div>
  );
}

UserHeading.propTypes = {
  avatar: PropTypes.string,
  nickname: PropTypes.string,
  time: PropTypes.string,
  onClick: PropTypes.func,
};

export default withRouter(UserHeading);
