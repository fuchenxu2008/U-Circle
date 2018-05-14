/**
 *
 * NewQuestionForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Modal, Upload } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

export class QuestionForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit = e => {
    const { form, currentUser, type } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err && currentUser) {
        this.props.onAddQuestion({ ...values, type, questioner: currentUser._id });
        form.resetFields();
        this.props.onOk();
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
              {getFieldDecorator('major', {
                rules: [{ required: true, message: 'Please input question major!' }],
              })(
                <Input prefix={<Icon type="tags-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Question Major (CSE/ACF)" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('body', {
                rules: [{ required: true, message: 'Please input question description!' }],
              })(
                <TextArea rows={4} placeholder="Question Description" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('postImg', {
                getValueFromEvent: e => {
                  console.log(e);
                  return e.fileList;
                },
              })(
                <Upload
                  name="postImg"
                  listType="picture-card"
                  multiple
                  beforeUpload={() => false}
                  headers={{ authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InF1ZXN0aW9uIjpbXSwiX2lkIjoiNWFiMGFkY2YwMjM5MTUxMWYwMWI0MzhhIiwiZW1haWwiOiJmdWNoZW54dTIwMDhAMTYzLmNvbSIsIm5pY2tuYW1lIjoiZnVjaGVueHUyMDA4IiwicGFzc3dvcmQiOiIkMmEkMDgkMTN3VVQwcFg0Zm80NDlFSDZpOWFQLkIvaVQyOGsvQ0ZnT0RGb2VOMFVzYjlDaW84dWhJa3UiLCJyb2xlIjoicGVlciIsIl9fdiI6MCwiYXZhdGFyIjoiL2FwaS91c2VyL2F2YXRhci8zMTkyNGFjZC0xNDEzLTQxZmYtYmY5YS03OWE4MmI0N2M0NGEucG5nIn0sImlhdCI6MTUyMjA1NjQ5OX0.q-pPcgnEhVpmYe-KsVFa5CBB4IlyR1QsjDK9hrGRsJ4' }}
                >
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                </Upload>
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
  onAddQuestion: PropTypes.func,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.string,
  currentUser: PropTypes.object,
};

export default Form.create()(QuestionForm);
