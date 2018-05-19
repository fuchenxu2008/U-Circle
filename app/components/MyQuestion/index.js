/**
*
* MyQuestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Popconfirm } from 'antd';
import './MyQuestion.css';

function MyQuestion({ question, history }) {
  console.log('question: ', question);

  return (
    <div>
      {
        question.type === 'occupational'
        ? (
          <Popconfirm title="Are you sure to pay 10 credit?" onConfirm={() => history.push(`/question/${question._id}`)} okText="Yes" cancelText="No">
            <div className="my-question-card">
              <small className={`question-major ${question.bestAnswer && 'question-solved'}`}>{question.major}</small>
              <div className="my-question-title">{question.title}</div>
              <Icon type="pay-circle" style={{ color: 'orange' }} /><span style={{ marginLeft: '2px', color: 'orange' }}>10</span>
            </div>
          </Popconfirm>
        ) : (
          <div className="my-question-card" onClick={() => history.push(`/question/${question._id}`)}>
            <small className={`question-major ${question.bestAnswer && 'question-solved'}`}>{question.major}</small>
            <div className="my-question-title">{question.title}</div>
          </div>
        )
      }
    </div>
  );
}

MyQuestion.propTypes = {
  question: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(MyQuestion);
