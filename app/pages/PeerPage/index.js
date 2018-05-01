/**
 *
 * PeerPage
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
import { getPeerQuestions, addQuestion } from './actions';
import './PeerPage.css';

export class PeerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { showAddForm: false, showHint: false };

  componentDidMount() {
    this.props.getPeerQuestions();
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

  render() {
    return (
      <div>
        <Helmet>
          <title>PeerPage</title>
          <meta name="description" content="Description of PeerPage" />
        </Helmet>
        <SearchBar searchType="academic" />
        <SearchResultCard key="key" />
        <br />
        <Row className="title-row">
          <h2 className="big-title" style={{ flex: 1 }}>PeerPage</h2>
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
          type="academic"
        />
        <QuestionsList
          type="peer"
          questions={this.props.peerQuestions}
        />
      </div>
    );
  }
}

PeerPage.propTypes = {
  history: PropTypes.object,
  currentUser: PropTypes.object,
  getPeerQuestions: PropTypes.func,
  addQuestion: PropTypes.func,
  peerQuestions: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
  peerQuestions: state.get('peerPage').get('peerQuestions').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPeerQuestions: () => dispatch(getPeerQuestions()),
    addQuestion: fields => dispatch(addQuestion(fields)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'peerPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(PeerPage);
