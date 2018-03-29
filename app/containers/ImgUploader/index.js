/**
 *
 * ImgUploader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Upload, Icon, Modal } from 'antd';
import injectReducer from 'utils/injectReducer';
import makeSelectImgUploader from './selectors';
import reducer from './reducer';
// import { getAuthHeader } from '../../authMiddleware';

export class ImgUploader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          name="postImg"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={() => false}
          headers={{ authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InF1ZXN0aW9uIjpbXSwiX2lkIjoiNWFiMGFkY2YwMjM5MTUxMWYwMWI0MzhhIiwiZW1haWwiOiJmdWNoZW54dTIwMDhAMTYzLmNvbSIsIm5pY2tuYW1lIjoiZnVjaGVueHUyMDA4IiwicGFzc3dvcmQiOiIkMmEkMDgkMTN3VVQwcFg0Zm80NDlFSDZpOWFQLkIvaVQyOGsvQ0ZnT0RGb2VOMFVzYjlDaW84dWhJa3UiLCJyb2xlIjoicGVlciIsIl9fdiI6MCwiYXZhdGFyIjoiL2FwaS91c2VyL2F2YXRhci8zMTkyNGFjZC0xNDEzLTQxZmYtYmY5YS03OWE4MmI0N2M0NGEucG5nIn0sImlhdCI6MTUyMjA1NjQ5OX0.q-pPcgnEhVpmYe-KsVFa5CBB4IlyR1QsjDK9hrGRsJ4' }}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

ImgUploader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  imguploader: makeSelectImgUploader(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'imgUploader', reducer });

export default compose(
  withReducer,
  withConnect,
)(ImgUploader);
