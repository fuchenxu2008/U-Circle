/**
*
* AnswerInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
// import styled from 'styled-components';
const FormItem = Form.Item;

class AnswerInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit = e => {
    e.preventDefault();
    const { form, onAnswer } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onAnswer(values);
        form.resetFields();
      }
    });
  };

  render() {
    const { inputBoxStyle } = style;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input your answer!' }],
          })(<Input placeholder="Answer here" style={inputBoxStyle} />)}
        </FormItem>
      </Form>
    );
  }
}

AnswerInput.propTypes = {
  form: PropTypes.object,
  onAnswer: PropTypes.func,
};

const style = {
  inputBoxStyle: {
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
};

export default Form.create()(AnswerInput);
