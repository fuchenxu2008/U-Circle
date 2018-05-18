/**
 *
 * AvatarUploader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';

import { uploadAvatar } from './actions';
import './AvatarUploader.css';

function beforeUpload(file) {
  const isImg = file.type.includes('image');
  if (!isImg) {
    message.error('You can only upload images!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isImg && isLt2M;
}

export class AvatarUploader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { loading: false };

  handleUpload = info => {
    this.setState({ loading: true });
    this.props.uploadAvatar(info.file)
    .then(() => {
      message.success('Upload success!');
      this.setState({ loading: false });
    })
    .catch(err => {
      message.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { disabled, avatar } = this.props;
    // if (!avatar) return <h1>Loading...</h1>;
    const uploadButton = (
      <div style={{ color: 'rgb(200, 200, 200)' }}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          disabled={disabled}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={this.handleUpload}
          style={{ backgroundImage: `url(${avatar})`, backgroundSize: 'cover', borderRadius: '100%', backgroundPosition: 'top' }}
        >
          {avatar ? <div></div> : (!disabled ? uploadButton : <div></div>)}
        </Upload>
      </div>
    );
  }
}

AvatarUploader.propTypes = {
  avatar: PropTypes.string,
  disabled: PropTypes.bool,
  uploadAvatar: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    uploadAvatar: avatar => dispatch(uploadAvatar(avatar)),
  };
}

export default connect(null, mapDispatchToProps)(AvatarUploader);
