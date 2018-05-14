/**
*
* MyQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './MyQuestion.css';

function MyQuestion({ question }) {
  return (
    <div className="my-question-card">
      <div className="my-question-title">{question.title}</div>
    </div>
  );
}

MyQuestion.propTypes = {
  question: PropTypes.object,
};

export default withRouter(MyQuestion);
