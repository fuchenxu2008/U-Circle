/**
*
* MyQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function MyQuestion({ question }) {
  return (
    <div>
      {question.title}
    </div>
  );
}

MyQuestion.propTypes = {
  question: PropTypes.object,
};

export default withRouter(MyQuestion);
