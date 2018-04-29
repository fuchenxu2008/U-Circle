/**
*
* AddButton
*
*/

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

function AddButton(props) {
  return (
    <Button
      onClick={props.handleClick}
      type="ghost"
      shape="circle"
      icon="plus-circle-o"
      size="large"
      className="addBtn"
    />
  );
}

AddButton.propTypes = {
  handleClick: PropTypes.func,
};

export default AddButton;
