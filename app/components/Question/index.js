/**
*
* PeerQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
// import styled from 'styled-components';
import { getCurrentUser } from '../../authMiddleware';
import './Question.css';

function Question(props) {
  return (
    <Row className="question">
      <h4 style={{ float: 'left' }}>{props.question.title}</h4>
      {
        getCurrentUser('id') === props.question.questioner &&
        <Button
          onClick={props.onClick}
          type="danger"
          ghost
          style={{ float: 'right' }}
        >
          Delete
        </Button>
      }
    </Row>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onClick: PropTypes.func,
};

export default Question;
