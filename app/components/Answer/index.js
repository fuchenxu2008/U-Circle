/**
*
* Answer
*
*/

import React from 'react';
import moment from 'moment';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import './Answer.css';

function Answer(props) {
  const { answer, onDeleteAnswer, onPickAnswer, currentQuestion, currentUser, bestAnswer } = props;
  const { _id, content, answerer, created_at } = answer;
  const isOwner = currentUser ? currentUser._id === answerer._id : false;
  const isQuestioner = currentUser ? currentUser._id === currentQuestion.questioner._id : false;

  const _handleDeleteAnswer = () => {
    onDeleteAnswer(_id);
  };

  const _handlePickAnswer = () => {
    onPickAnswer(currentQuestion._id, _id);
  };

  return (
    <li className="answer-wrapper">
      <Avatar className="question-user-avatar" src={answerer.avatar} />
      <div className="answer-detail">
        <small className="question-user-nickname">{answerer.nickname}</small>
        <p className="answer-body">{content}</p>
        <small className="answer-time">{moment(created_at).fromNow()}</small>
      </div>
      {
        isOwner &&
        <Button
          onClick={_handleDeleteAnswer}
          type="danger"
          shape="circle"
          className="delete-btn"
          icon="delete"
          ghost
        />
      }
      {
        isQuestioner && !bestAnswer &&
        <Button
          onClick={_handlePickAnswer}
          type="primary"
          shape="circle"
          className="delete-btn"
          style={{ marginLeft: '20px' }}
          icon="check"
          ghost
        />
      }
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.object,
  currentUser: PropTypes.object,
  currentQuestion: PropTypes.object,
  onDeleteAnswer: PropTypes.func,
  onPickAnswer: PropTypes.func,
  bestAnswer: PropTypes.object,
};

export default Answer;
