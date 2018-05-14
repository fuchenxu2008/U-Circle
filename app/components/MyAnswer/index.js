/**
*
* MyAnswer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './MyAnswer.css';

function MyAnswer({ answer }) {
  return (
    <div className="my-question-card">
      <div className="my-question-title">{answer.content}</div>
    </div>
  );
}

MyAnswer.propTypes = {
  answer: PropTypes.object,
};

export default withRouter(MyAnswer);
