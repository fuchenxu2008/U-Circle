/**
*
* StudentQuestion
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Modal, Icon } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import UserHeading from 'components/UserHeading';
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

  handleSubscribeQuestion = e => {
    e.stopPropagation();
    const { onSubscribeQuestion, history, currentUser, question } = this.props;
    if (currentUser) {
      onSubscribeQuestion({ userId: currentUser._id, questionId: question._id });
    } else {
      history.push('/auth');
    }
  }

  render() {
    const { history, question, currentUser } = this.props;
    const { title, created_at, questioner, _id, images, subscribers, answer, major, bestAnswer } = question;
    const questionSubscribed = currentUser ? subscribers.includes(currentUser._id) : false;
    return (
      <Row className="question">
        <UserHeading
          avatar={questioner.avatar}
          nickname={questioner.nickname}
          time={moment(created_at).fromNow()}
          onClick={() => history.push(`/user/${questioner._id}`)}
        />
        <hr className="question-divider" />
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

          <div className="question-action">
            <div className={`question-major ${bestAnswer && 'question-solved'}`}><Icon type="tags-o" />{major}</div>
            {
              !history.location.pathname.match('/alumni') &&
              <button className="question-action-btn" onClick={() => history.push(`/question/${_id}`)}>
                <Icon type="message" /> { answer.length ? `${answer.length} answers` : 'Answer' }
              </button>
            }
            {
              questionSubscribed
                ? <button className="question-action-btn" onClick={this.handleSubscribeQuestion}><Icon type="star" /> Subscribed</button>
                : <button className="question-action-btn" onClick={this.handleSubscribeQuestion}><Icon type="star-o" /> Subscribe</button>
            }
          </div>

        </div>
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
