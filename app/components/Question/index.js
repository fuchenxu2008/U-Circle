/**
*
* StudentQuestion
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Avatar, Modal } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import './Question.css';

class Question extends Component {  // eslint-disable-line react/prefer-stateless-function
  state = {
    showPreview: false,
    previewImg: '',
  }

  handlePreview(img, e) {
    e.stopPropagation();
    this.setState({
      previewImg: img,
      showPreview: true,
    });
  }

  handleCancelPreview = e => {
    e.stopPropagation();
    this.setState({ showPreview: false });
  }

  handleSubscribeQuestion = () => {
    const { onSubscribeQuestion, history, currentUser, question } = this.props;
    if (currentUser) {
      onSubscribeQuestion({ userId: currentUser._id, questionId: question._id });
    } else {
      history.push('/auth');
    }
  }

  render() {
    const { history, question, currentUser } = this.props;
    const { title, created_at, questioner, _id, images, subscribers } = question;
    const showAsSubscribed = currentUser ? subscribers.includes(currentUser._id) : false;

    return (
      <Row className="question">
        <Row className="question-info">
          <Avatar className="question-user-avatar" src={questioner.avatar} />
          <div className="question-userinfo">{questioner.nickname}</div>
          <small className="question-time">{moment(created_at).fromNow()}</small>
        </Row>
        <div
          className="question-content"
          onClick={e => {
            e.nativeEvent.stopPropagation();
            this.props.history.push(`/question/${_id}`);
          }}
        >
          <Row>
            <p className="question-title">{title}</p>
          </Row>
          <div className="question-content-img-section">
            {
              images.map(img => (
                <div key={img} className="question-content-img-box">
                  <img src={img} alt="img" className="question-content-img" onClick={e => this.handlePreview(img, e)} />
                </div>
              ))
            }
            <Modal
              visible={this.state.showPreview}
              footer={null}
              onCancel={this.handleCancelPreview}
            >
              <img alt="" style={{ width: '100%' }} src={this.state.previewImg} />
            </Modal>
          </div>
        </div>
        <Row className="question-action">
          <Button ghost icon="bulb" className="question-action-btn" onClick={() => history.push(`/question/${_id}`)}>Answer</Button>
          {
            !showAsSubscribed &&
            <Button ghost icon="star-o" className="question-action-btn" onClick={this.handleSubscribeQuestion}>Subscribe</Button>
          }
        </Row>
      </Row>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
  history: PropTypes.object,
  onSubscribeQuestion: PropTypes.func,
  currentUser: PropTypes.object,
};

export default withRouter(Question);
