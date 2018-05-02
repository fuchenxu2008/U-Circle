/**
*
* Answer
*
*/

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Avatar, Button } from 'antd';
import PropTypes from 'prop-types';
import './Answer.css';

function Answer(props) {
  const { _id, content, answerer, created_at } = props.answer;
  const isOwner = props.currentUser ? props.currentUser._id === answerer._id : false;

  const _handleDeleteAnswer = () => {
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
          onClick={_handleDeleteAnswer}
          type="danger"
          shape="circle"
          className="delete-btn"
          icon="delete"
        />
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
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
});

export default connect(mapStateToProps)(Answer);
