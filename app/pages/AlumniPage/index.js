/**
 *
 * AlumniPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Row } from 'antd';
import SearchBar from 'containers/SearchBar';
import SearchResultCard from 'containers/SearchResultCard';
import QuestionsList from 'components/QuestionsList';
import AddButton from 'components/AddButton';
import LoginHint from 'components/LoginHint';
import NewQuestionForm from 'components/NewQuestionForm';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getAlumniQuestions, addQuestion, subscribeQuestion } from './actions';
// import './AlumniPage.css';

export class AlumniPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { showAddForm: false, showHint: false };

  componentDidMount() {
    this.props.getAlumniQuestions();
    if (this.props.socket) {
      this.props.socket.on('data', () => this.props.getAlumniQuestions());
    }
  }

  showForm = () => {
    if (this.props.currentUser) {
      this.setState({ showAddForm: true });
    } else {
      this.setState({ showHint: true });
    }
  }
  hideForm = () => this.setState({ showAddForm: false, showHint: false });

  handleAddQuestion = question => this.props.addQuestion(question);

  handleSubscribeQuestion = ({ userId, questionId }) => {
    this.props.subscribeQuestion({ userId, questionId });
  }

  render() {
    return (
      <div className="body-container Alumnipage-bg">
        <Helmet>
          <title>AlumniPage</title>
          <meta name="description" content="Description of AlumniPage" />
        </Helmet>
        <SearchBar searchType="occupational" />
        <SearchResultCard key="key" />
        <br />
        <Row className="title-row">
          <h2 className="big-title" style={{ flex: 1 }}>Alumni Page</h2>
          <AddButton handleClick={this.showForm} />
          <LoginHint
            visible={this.state.showHint}
            onCancel={this.hideForm}
            onOk={() => this.props.history.push('/auth')}
          />
        </Row>
        <NewQuestionForm
          visible={this.state.showAddForm}
          onCancel={this.hideForm}
          onOk={this.hideForm}
          onAddQuestion={this.handleAddQuestion}
          type="occupational"
          currentUser={this.props.currentUser}
        />
        <QuestionsList
          questions={this.props.alumniQuestions}
          onSubscribeQuestion={this.handleSubscribeQuestion}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

AlumniPage.propTypes = {
  history: PropTypes.object,
  currentUser: PropTypes.object,
  getAlumniQuestions: PropTypes.func,
  addQuestion: PropTypes.func,
  subscribeQuestion: PropTypes.func,
  alumniQuestions: PropTypes.object,
  socket: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  alumniQuestions: state.get('alumniPage').get('alumniQuestions').toJS(),
  socket: state.get('global').get('socket'),
});

function mapDispatchToProps(dispatch) {
  return {
    getAlumniQuestions: () => dispatch(getAlumniQuestions()),
    addQuestion: fields => dispatch(addQuestion(fields)),
    subscribeQuestion: info => dispatch(subscribeQuestion(info)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'alumniPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(AlumniPage);
