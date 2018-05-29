/**
*
* MyAnswer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './MyAnswer.css';

export function MyAnswer({ answer, history }) {
  const { content, question } = answer;
  const { _id, questioner, title, major, type, bestAnswer } = question;
  return (
    <div className="my-answer-card" onClick={() => history.push(`/question/${_id}`)}>
      <small className={`question-major ${bestAnswer && 'question-solved'}`}>{major}</small>
      <div style={{ flex: 1 }}>
        You answered <span className="yellow-text">{`${questioner.nickname}'s`}</span> {type} question <span className="yellow-text">{title}:</span><br />
        <span className="my-answer-content">{content}</span>
      </div>
    </div>
  );
}

MyAnswer.propTypes = {
  answer: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(MyAnswer);
