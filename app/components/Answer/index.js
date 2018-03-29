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
// import styled from 'styled-components';

function Answer(props) {
  const { _id, content, answerer, created_at } = props.answer;
  const { currentUser } = props;
  const isOwner = currentUser ? currentUser._id === answerer._id : false;
  const handleDeleteAnswer = () => {
    props.onDeleteAnswer(_id);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <li>
        <Avatar src={answerer.avatar} />
        <small>{answerer.nickname}</small>
        <p>{content}</p>
        <small>{moment(created_at).fromNow()}</small>
        {
          isOwner &&
          <Button
            onClick={handleDeleteAnswer}
            type="danger"
            shape="circle"
            style={{ float: 'right' }}
          >
            <Icon type="delete" />
          </Button>
        }
      </li>
    </div>
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
