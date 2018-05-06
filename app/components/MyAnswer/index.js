/**
*
* MyAnswer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function MyAnswer({ answer }) {
  return (
    <div>
      {answer.content}
    </div>
  );
}

MyAnswer.propTypes = {
  answer: PropTypes.object,
};

export default withRouter(MyAnswer);
