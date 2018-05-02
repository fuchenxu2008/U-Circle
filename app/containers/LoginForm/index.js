/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Icon, Input, Button, Checkbox, Spin, Radio } from 'antd';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { changeFormMode } from './actions';
import { loginAction, registerAction } from '../../pages/App/actions';
import './LoginForm.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export class NormalLoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleChangeFormMode = () => {
    this.props.changeFormMode(this.props.formMode);
  }

  compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  handleSubmit = e => {
    const { formMode, register, login, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) formMode === 'login' ? login(values) : register(values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formMode, currentUser } = this.props;
    if (currentUser) return <Redirect to="/me" />;
    return (
      <div className="loginFormStyle">
        <Spin spinning={this.props.loading}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </FormItem>
            {
              formMode === 'register' &&
              <FormItem>
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: 'Please input your nickname!' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nickname" />)}
              </FormItem>
            }
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            {
              formMode === 'register' &&
              <div>
                <FormItem>
                  {getFieldDecorator('re-password', {
                    rules: [
                      { required: true, message: 'Please input your Password again!' },
                      { validator: this.compareToFirstPassword },
                    ],
                  })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-enter Password" />)}
                </FormItem>
                <FormItem className="collection-create-form_last-form-item">
                  {getFieldDecorator('role', {
                    initialValue: 'peer',
                  })(
                    <RadioGroup>
                      <Radio value="peer">Peer</Radio>
                      <Radio value="alumni">Alumni</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </div>
            }
            {
              formMode === 'login' &&
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <br />
              </FormItem>
            }
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button loginButtonStyle">
                {formMode === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
              Or <div onClick={this.handleChangeFormMode} className="linkStyle">
                {formMode === 'login'
                  ? 'register now!'
                  : 'Login here'
                }
              </div>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  form: PropTypes.object,
  formMode: PropTypes.string,
  changeFormMode: PropTypes.func,
  register: PropTypes.func,
  login: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
};

const LoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  formMode: state.get('loginForm').get('formMode'),
  loading: state.get('loginForm').get('loading'),
});

function mapDispatchToProps(dispatch) {
  return {
    changeFormMode: preMode => dispatch(changeFormMode(preMode)),
    register: fields => dispatch(registerAction(fields)),
    login: fields => dispatch(loginAction(fields)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginForm', reducer });

export default compose(
  withReducer,
  withConnect,
)(LoginForm);
