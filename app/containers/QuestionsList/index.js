/**
 *
 * QuestionsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Question from 'components/Question';

export class QuestionsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const questionItems = _.map(this.props.questions, question => (
      <Question
        key={question._id}
        question={question}
        onClick={() => this.props.onDeleteQuestion(question)}
      />
    ));

    return (
      <div>
        <ul style={{ paddingLeft: 0 }}>
          {questionItems}
        </ul>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  questions: PropTypes.object,
  onDeleteQuestion: PropTypes.func,
};

export default QuestionsList;
