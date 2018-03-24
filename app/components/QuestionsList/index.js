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
    const questions = _.sortBy(this.props.questions, 'created_at').reverse();
    const questionItems = _.map(questions, question => (
      <Question
        key={question._id}
        question={question}
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
};

export default QuestionsList;
