/**
*
* AnswerInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import './AnswerInput.css';
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="comment-box">
        <FormItem>
          {getFieldDecorator('content', {
            rules: [{ required: true }],
          })(<Input placeholder="Answer here" />)}
        </FormItem>
      </Form>
    );
  }
}

AnswerInput.propTypes = {
  form: PropTypes.object,
  onAnswer: PropTypes.func,
};

export default Form.create()(AnswerInput);
