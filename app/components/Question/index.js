/**
*
* PeerQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Avatar } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
// import styled from 'styled-components';
import './Question.css';

function Question(props) {
  const { title, created_at, questioner, _id } = props.question;
  return (
    <Row className="question">
      <Row className="question-info">
        <Avatar className="question-user-avatar" src={questioner.avatar} />
        <text className="question-userinfo">{questioner.nickname}</text>
        <small className="question-time">{moment(created_at).fromNow()}</small>
      </Row>
      <Row className="question-content" onClick={() => props.history.push(`/question/${_id}`)}>
        <b className="question-title">{title}</b>
      </Row>
      <Row className="question-action">
        <Button
          icon="bulb"
          className="question-action-left-btn"
          onClick={() => props.history.push(`/question/${_id}`)}
        >Answer</Button>
        <Button
          icon="star-o"
          className="question-action-right-btn"
          onClick={() => { alert('working on it'); }}
        >Subscribe</Button>
      </Row>
    </Row>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Question);
