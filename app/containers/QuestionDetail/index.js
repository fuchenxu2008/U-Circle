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
import { getQuestion, deleteQuestion, clearDetailPage, answerQuestion, deleteAnswer } from './actions';
import './QuestionDetail.css';

export class QuestionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getQuestion(id);
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
    return this.props.answerQuestion({
      content: fields.content,
      answerer: currentUser._id,
      questionId: this.props.question._id,
    });
  }

  handleDeleteAnswer = id => {
    this.props.deleteAnswer(id);
  }

  render() {
    const { question, currentUser } = this.props;
    if (!question) {
      return <h3>Loading...</h3>;
    }
    const { title, body, created_at, questioner, answer, images } = question;
    const isOwner = currentUser ? currentUser._id === questioner._id : false;
    return (
      <div className="question-detailed">
        <Button onClick={() => history.go(-1)} icon="left-circle" type="primary" ghost>Back</Button>
        <br /><br />
        <div className="detailed-userinfo">
          <Avatar className="question-user-avatar" src={questioner.avatar} />
          <b className="question-user-nickname">{questioner.nickname}</b>
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
          <h4><b>{title}</b></h4>
          <Divider />
          <p className="question-detail-body">{body}</p>
          <div>
            {
              images.map(img => (
                <img key={img} src={img} alt="" className="question-detail-img" />
              ))
            }
          </div>
          <Divider />
          <small>{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}</small>
        </div>
        <AnswersList answers={answer} onDeleteAnswer={this.handleDeleteAnswer} />
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
  question: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  deleteAnswer: PropTypes.func,
};

const mapStateToProps = state => ({
  question: state.get('questionDetail'),
  currentUser: state.get('global').get('currentUser'),
});

function mapDispatchToProps(dispatch) {
  return {
    getQuestion: id => dispatch(getQuestion(id)),
    deleteQuestion: id => dispatch(deleteQuestion(id)),
    clearDetailPage: () => dispatch(clearDetailPage()),
    answerQuestion: fields => dispatch(answerQuestion(fields)),
    deleteAnswer: id => dispatch(deleteAnswer(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'questionDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(QuestionDetail);
