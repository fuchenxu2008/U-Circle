/**
 *
 * QuestionDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Button, Icon, Divider, message, Avatar } from 'antd';
import 'animate.css';
import injectReducer from 'utils/injectReducer';
import AnswerInput from 'components/AnswerInput';
import AnswersList from 'components/AnswersList';
import reducer from './reducer';
import { getQuestion, deleteQuestion, clearDetailPage, answerQuestion, deleteAnswer, pickAnswer } from './actions';
import './QuestionDetail.css';

export class QuestionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getQuestion(id)
      .catch(() => this.props.history.goBack());
  }

  componentWillUnmount() {
    this.props.clearDetailPage();
  }

  handleDeleteQuestion = async () => {
    await this.props.deleteQuestion(this.props.question._id);
    this.props.history.goBack();
  }

  handleSubmitAnswer = fields => {
    const { currentUser } = this.props;
    if (!currentUser) return message.info('Log in first');
    return this.props
      .answerQuestion({
        content: fields.content,
        answerer: currentUser._id,
        questionId: this.props.question._id,
      })
      .catch(() => this.props.history.goBack());
  }

  handleDeleteAnswer = id => {
    this.props.deleteAnswer(id)
      .catch(() => this.props.history.goBack());
  }

  handlePickAnswer = (questionId, answerId) => {
    this.props.pickAnswer(questionId, answerId)
      .catch(() => this.props.history.goBack());
  }

  render() {
    const { question, currentUser } = this.props;
    if (!question) {
      return <h3>Loading...</h3>;
    }
    const { title, body, created_at, questioner, answer, images, bestAnswer } = question;
    const isOwner = currentUser ? currentUser._id === questioner._id : false;
    return (
      <div className="question-detailed">
        <div className="detailed-userinfo">
          <Avatar className="question-user-avatar" src={questioner.avatar} />
          <div className="question-user-section">
            <small className="question-user-nickname">{questioner.nickname}</small><br />
            <small className="question-time">{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}</small>
          </div>
          {
            isOwner &&
            <Button
              onClick={this.handleDeleteQuestion}
              type="danger"
              shape="circle"
              ghost
              style={{ float: 'right' }}
            >
              <Icon type="delete" />
            </Button>
          }
        </div>
        <div>
          <h2 className="question-detail-title"><b>{title}</b></h2>
          <p className="question-detail-body">{body}</p>
          <div>
            {images.map(img => (
              <img key={img} src={img} alt="" className="question-detail-img" />
            ))}
          </div>
        </div>

        <Divider />

        {
          bestAnswer &&
          <div className="bestanswer-card">
            <h3 className="bestanswer-flag"><b>Best Answer</b></h3>
            <div className="answer-wrapper" style={{ marginBottom: 0 }}>
              <Avatar className="question-user-avatar" src={bestAnswer.answerer.avatar} />
              <div className="answer-detail">
                <small className="question-user-nickname">{bestAnswer.answerer.nickname}</small>
                <p className="answer-body">{bestAnswer.content}</p>
              </div>
            </div>
          </div>
        }
        <AnswersList
          bestAnswer={bestAnswer}
          answers={answer}
          onDeleteAnswer={this.handleDeleteAnswer}
          currentQuestion={question}
          currentUser={currentUser}
          onPickAnswer={this.handlePickAnswer}
        />
        <AnswerInput position="bottom" onAnswer={this.handleSubmitAnswer} />
      </div>
    );
  }
}

QuestionDetail.propTypes = {
  match: PropTypes.object,
  getQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  clearDetailPage: PropTypes.func,
  answerQuestion: PropTypes.func,
  pickAnswer: PropTypes.func,
  question: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  deleteAnswer: PropTypes.func,
};

const mapStateToProps = state => ({
  question: state.get('questionDetail'),
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getQuestion: id => dispatch(getQuestion(id)),
    deleteQuestion: id => dispatch(deleteQuestion(id)),
    clearDetailPage: () => dispatch(clearDetailPage()),
    answerQuestion: fields => dispatch(answerQuestion(fields)),
    deleteAnswer: id => dispatch(deleteAnswer(id)),
    pickAnswer: (questionId, answerId) => dispatch(pickAnswer(questionId, answerId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'questionDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(QuestionDetail);
