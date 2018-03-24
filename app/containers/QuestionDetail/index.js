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
import { Button, Icon } from 'antd';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getQuestion, deleteQuestion } from './actions';
import { getCurrentUser } from '../../authMiddleware';

export class QuestionDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getQuestion(id);
  }

  handleDeleteQuestion = () => {
    this.props.deleteQuestion(this.props.question._id);
    this.props.history.goBack();
  }

  render() {
    if (!this.props.question.questioner) {
      return <h3>Loading...</h3>;
    }
    const { title, body, created_at, questioner } = this.props.question;
    return (
      <div>
        <h2>QuestionDetail</h2>
        <div>
          <h3>{title}</h3>
          <small>{questioner.nickname}</small>
          <br />
          <small>{moment(created_at).format('YYYY-MM-DD hh:mm:ss')}</small>
          <p>{body}</p>
          {
            getCurrentUser('id') === questioner._id &&
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
      </div>
    );
  }
}

QuestionDetail.propTypes = {
  match: PropTypes.object,
  getQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  question: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  question: state.get('questionDetail').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getQuestion: id => dispatch(getQuestion(id)),
    deleteQuestion: id => dispatch(deleteQuestion(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'questionDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(QuestionDetail);
