/**
*
* LoginHint
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
// import styled from 'styled-components';

function LoginHint({ visible, onCancel, onOk }) {
  return (
    <Modal
      title="Try logging in first?"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      Oops, You have to log in to ask new questions!
    </Modal>
  );
}

LoginHint.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default LoginHint;
