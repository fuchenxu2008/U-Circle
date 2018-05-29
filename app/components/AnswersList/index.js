/**
*
* AnswersList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Answer from 'components/Answer';
// import styled from 'styled-components';

export class AnswersList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { answers, onDeleteAnswer, onPickAnswer, currentQuestion, currentUser, bestAnswer } = this.props;
    return (
      <div>
        <ul style={{ paddingLeft: 0, listStyle: 'none', marginTop: '20px' }}>
          {
            answers.map(answer => (
              <Answer
                key={answer._id}
                answer={answer}
                bestAnswer={bestAnswer}
                onDeleteAnswer={onDeleteAnswer}
                onPickAnswer={onPickAnswer}
                currentQuestion={currentQuestion}
                currentUser={currentUser}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

AnswersList.propTypes = {
  answers: PropTypes.array,
  onDeleteAnswer: PropTypes.func,
  onPickAnswer: PropTypes.func,
  currentQuestion: PropTypes.object,
  currentUser: PropTypes.object,
  bestAnswer: PropTypes.object,
};

export default AnswersList;
