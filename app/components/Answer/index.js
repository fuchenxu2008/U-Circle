/**
*
* Answer
*
*/

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Avatar, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './Answer.css';

function Answer(props) {
  const { _id, content, answerer, created_at } = props.answer;
  const { currentUser } = props;
  const isOwner = currentUser ? currentUser._id === answerer._id : false;
  const handleDeleteAnswer = () => {
    props.onDeleteAnswer(_id);
  };

  return (
    <li className="answer-wrapper">
      <Avatar className="question-user-avatar" src={answerer.avatar} />
      <div className="answer-detail">
        <b>{answerer.nickname}</b>
        <p className="answer-body">{content}</p>
        <small className="answer-time">{moment(created_at).fromNow()}</small>
      </div>
      {
        isOwner &&
        <Button
          onClick={handleDeleteAnswer}
          type="danger"
          shape="circle"
          className="delete-btn"
        >
          <Icon type="delete" />
        </Button>
      }
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.object,
  currentUser: PropTypes.object,
  onDeleteAnswer: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
});

export default connect(mapStateToProps)(Answer);
