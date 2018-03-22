/**
 *
 * PeerQuestionsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

export class PeerQuestionsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const questionItems = this.props.peerQuestions.map(question => (
      <li key={question._id}>{question.title}</li>
    ));
    return (
      <div>
        <ul>
          {questionItems}
        </ul>
      </div>
    );
  }
}

PeerQuestionsList.propTypes = {
  peerQuestions: PropTypes.arrayOf(PropTypes.object),
};

export default PeerQuestionsList;
