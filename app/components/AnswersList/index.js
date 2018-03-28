/**
*
* AnswersList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Answer from 'components/Answer';
// import styled from 'styled-components';

class AnswersList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { answers, onDeleteAnswer } = this.props;
    return (
      <div>
        <ul style={{ paddingLeft: '10px', listStyle: 'none', marginTop: '20px' }}>
          {
            answers.map(answer => (
              <Answer key={answer._id} answer={answer} onDeleteAnswer={onDeleteAnswer} />
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
};

export default AnswersList;
