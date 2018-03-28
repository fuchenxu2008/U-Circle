/**
*
* Answer
*
*/

import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Answer(props) {
  const { content, answerer, created_at } = props.answer;
  return (
    <div>
      <li>
        <Avatar src={answerer.avatar} />
        <small>{answerer.nickname}</small>
        <p>{content}</p>
        <small>{moment(created_at).fromNow()}</small>
      </li>
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.object,
};

export default Answer;
