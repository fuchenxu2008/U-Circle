/**
*
* AddButton
*
*/

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './AddButton.css';
// import styled from 'styled-components';

function AddButton(props) {
  return (
    <div>
      <Button
        onClick={props.handleClick}
        type="ghost"
        shape="circle"
        icon="plus-circle-o"
        size="large"
        className="addBtn"
      />
    </div>
  );
}

AddButton.propTypes = {
  handleClick: PropTypes.func,
  // align: PropTypes.string,
};

export default AddButton;
