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
import QuestionsList from 'containers/QuestionsList';
import AddButton from 'components/AddButton';
import NewQuestionForm from 'containers/NewQuestionForm';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getPeerQuestions, deleteQuestion } from './actions';

export class PeerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { showAddForm: false }

  componentDidMount() {
    this.props.getPeerQuestions();
  }

  showForm = () => this.setState({ showAddForm: true });
  hideForm = () => this.setState({ showAddForm: false });

  render() {
    return (
      <div>
        <Helmet>
          <title>PeerPage</title>
          <meta name="description" content="Description of PeerPage" />
        </Helmet>
        <Row>
          <h1 style={{ float: 'left' }}>PeerPage</h1>
          <AddButton handleClick={this.showForm} align="right" />
        </Row>
        <NewQuestionForm
          visible={this.state.showAddForm}
          onCancel={this.hideForm}
          onSubmit={this.hideForm}
        />
        <QuestionsList
          type="peer"
          questions={this.props.peerQuestions}
          onDeleteQuestion={question => this.props.deleteQuestion(question)}
        />
      </div>
    );
  }
}

PeerPage.propTypes = {
  getPeerQuestions: PropTypes.func,
  deleteQuestion: PropTypes.func,
  peerQuestions: PropTypes.object,
};

const mapStateToProps = state => ({
  // currentUser: state.get('global').get('currentUser'),
  peerQuestions: state.get('peerPage').get('peerQuestions').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteQuestion: question => dispatch(deleteQuestion(question)),
    getPeerQuestions: () => dispatch(getPeerQuestions()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'peerPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(PeerPage);
