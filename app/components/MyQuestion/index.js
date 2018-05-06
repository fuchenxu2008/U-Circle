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
      {question.title}
    </div>
  );
}

MyQuestion.propTypes = {
  question: PropTypes.object,
};

export default withRouter(MyQuestion);
