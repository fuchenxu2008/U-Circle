/**
*
* AddButton
*
*/

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function AddButton(props) {
  return (
    <div>
      <Button onClick={props.handleClick} type="ghost" shape="circle" icon="plus-circle-o" size="large" />
    </div>
  );
}

AddButton.propTypes = {
  handleClick: PropTypes.func,
};

export default AddButton;
