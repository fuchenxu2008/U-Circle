/**
*
* PeerQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
import moment from 'moment';
// import styled from 'styled-components';
// import { getCurrentUser } from '../../authMiddleware';
import './Question.css';

function Question(props) {
  const { title, created_at, questioner } = props.question;
  return (
    <Row className="question">
      <Row className="question-info">
        <text className="question-questioner">{questioner.nickname}</text>
        <small className="question-time">{moment(created_at).fromNow()}</small>
      </Row>
      <Row className="question-content">
        <b className="question-title">{title}</b>
      </Row>
      <Row className="question-action">
        <Button icon="bulb" className="question-action-left-btn">Answer</Button>
        <Button icon="star-o" className="question-action-right-btn">Subscribe</Button>
      </Row>

      {
        // getCurrentUser('id') === questioner &&
        // <Button
        //   onClick={props.onClick}
        //   type="danger"
        //   shape="circle"
        //   ghost
        //   style={{ float: 'right' }}
        // >
        //   <Icon type="delete" />
        // </Button>
      }
    </Row>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  // onClick: PropTypes.func,
};

export default Question;
