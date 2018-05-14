/**
*
* AnswerInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Icon } from 'antd';
import './AnswerInput.css';
const FormItem = Form.Item;


class AnswerInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit = e => {
    e.preventDefault();
    const { form, onAnswer } = this.props;
    form.validateFields((err, values) => {
      if (!err && values.content) {
        console.log(values);
        onAnswer(values);
        form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="comment-box-inner-wrapper">
        <button className="btn" onClick={() => history.go(-1)}><Icon type="left" /></button>
        <Form onSubmit={this.handleSubmit} className="comment-box">
          <FormItem>
            {getFieldDecorator('content')(
              <Input placeholder="Answer here" />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

AnswerInput.propTypes = {
  form: PropTypes.object,
  onAnswer: PropTypes.func,
};

export default Form.create()(AnswerInput);
