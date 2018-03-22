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
import PeerQuestionsList from 'components/PeerQuestionsList';
import AddButton from 'components/AddButton';
import NewQuestionForm from 'containers/NewQuestionForm';
import injectReducer from 'utils/injectReducer';
// import makeSelectPeerPage from './selectors';
import reducer from './reducer';
import { getPeerQuestion } from './actions';

export class PeerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    showAddForm: false,
  }

  componentDidMount() {
    this.props.getPeerQuestions(this.props.currentUser.token);
  }

  showForm = () => {
    this.setState({ showAddForm: true });
  }

  hideForm = () => {
    this.setState({ showAddForm: false });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>PeerPage</title>
          <meta name="description" content="Description of PeerPage" />
        </Helmet>
        PeerPage
        <AddButton handleClick={this.showForm} />
        <NewQuestionForm
          visible={this.state.showAddForm}
          handleCancel={this.hideForm}
          handleSubmit={this.hideForm}
        />
        <PeerQuestionsList peerQuestions={this.props.peerQuestions} />
      </div>
    );
  }
}

PeerPage.propTypes = {
  getPeerQuestions: PropTypes.func,
  currentUser: PropTypes.object,
  peerQuestions: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
  peerQuestions: state.get('peerPage').get('questions').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPeerQuestions: token => dispatch(getPeerQuestion(token)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'peerPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(PeerPage);
