/**
 *
 * NewQuestionForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { addQuestion } from './actions';

const FormItem = Form.Item;
const { TextArea } = Input;

export class QuestionForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.addQuestion(values);
        form.resetFields();
        this.props.onSubmit();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel } = this.props;
    return (
      <div>
        <Modal
          title="Ask New Qustion"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={onCancel}
          footer={[
            <Button key="cancel" onClick={onCancel}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input question title!' }],
              })(
                <Input prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Question Title" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('body', {
                rules: [{ required: true, message: 'Please input question description!' }],
              })(
                <TextArea prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} rows={4} placeholder="Question Description" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  form: PropTypes.object,
  addQuestion: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: fields => dispatch(addQuestion(fields)),
  };
}

const NewQuestionForm = Form.create()(QuestionForm);

export default connect(null, mapDispatchToProps)(NewQuestionForm);
