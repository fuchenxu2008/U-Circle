/**
*
* MyQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './MyQuestion.css';

export function MyQuestion({ question, history }) {
  console.log('question: ', question);

  return (
    <div className="my-question-card" onClick={() => history.push(`/question/${question._id}`)}>
      <small className={`question-major ${question.bestAnswer && 'question-solved'}`}>{question.major}</small>
      <div className="my-question-title">{question.title}</div>
    </div>
  );
}

MyQuestion.propTypes = {
  question: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(MyQuestion);
