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

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

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
    const { currentUser } = this.props;
    if (!currentUser) return <h1>Loading...</h1>;
    const { avatar } = currentUser;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={this.handleUpload}
      >
        {avatar ? <img src={avatar} alt="" className="avatar-display" /> : uploadButton}
      </Upload>
    );
  }
}

AvatarUploader.propTypes = {
  currentUser: PropTypes.object,
  uploadAvatar: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    uploadAvatar: avatar => dispatch(uploadAvatar(avatar)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUploader);
