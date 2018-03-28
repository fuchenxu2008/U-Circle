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
    return (
      <div>
        <ul style={{ paddingLeft: '10px', listStyle: 'none', marginTop: '20px' }}>
          {
            this.props.answers.map(answer => (
              <Answer key={answer._id} answer={answer} />
            ))
          }
        </ul>
      </div>
    );
  }
}

AnswersList.propTypes = {
  answers: PropTypes.array,
};

export default AnswersList;
