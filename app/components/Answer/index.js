/**
*
* Answer
*
*/

import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import './Answer.css';

export function Answer(props) {
  const { answer, onDeleteAnswer, onPickAnswer, currentQuestion, currentUser, bestAnswer, history } = props;
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
      <Avatar className="question-user-avatar" src={answerer.avatar} onClick={() => history.push(`/user/${answerer._id}`)} />
      <div className="answer-detail">
        <div>
          <small className="question-user-nickname">{answerer.nickname}</small><br />
          <small className="answer-time">{moment(created_at).fromNow()}</small>
        </div>
        <p className="answer-body">{content}</p>
        <div className="answer-action">
          {
            isOwner &&
            <Button
              onClick={_handleDeleteAnswer}
              type="danger"
              className="answer-btn"
              icon="delete"
              ghost
            >Delete</Button>
          }
          {
            isQuestioner && !bestAnswer &&
            <Button
              onClick={_handlePickAnswer}
              type="primary"
              className="answer-btn"
              icon="check"
              ghost
            >Pick As Best</Button>
          }
        </div>
      </div>
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
  history: PropTypes.object,
};

export default withRouter(Answer);
