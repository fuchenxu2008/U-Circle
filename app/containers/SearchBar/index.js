/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input } from 'antd';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import {
  searchTypeChange,
  searchMajorChange,
  searchKeywordChange,
  searchQuestion,
} from './actions';

const Search = Input.Search;
const InputGroup = Input.Group;

export class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onSearchTypeChange(this.props.searchType);
  }

  async onMajorChange(major) {
    await this.props.onSearchMajorChange(major);
    console.log(this.props.searchPhrase);
  }

  async onKeywordChange(keyword) {
    await this.props.onSearchKeywordChange(keyword);
    console.log(this.props.searchPhrase);
    this.search();
  }

  search = () => {
    this.props.searchQuestion(this.props.searchPhrase);
  }

  render() {
    return (
      <div>
        <InputGroup compact>
          <Input
            style={{ width: '30%' }}
            placeholder="Major"
            onChange={e => this.onMajorChange(e.target.value)}
          />
          <Search
            style={{ width: '70%' }}
            placeholder="Keyword"
            onSearch={this.search}
            onChange={e => this.onKeywordChange(e.target.value)}
            enterButton
          />
        </InputGroup>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchType: PropTypes.string,
  searchQuestion: PropTypes.func,
  onSearchKeywordChange: PropTypes.func,
  onSearchTypeChange: PropTypes.func,
  searchPhrase: PropTypes.object,
};

const mapStateToProps = state => ({
  searchPhrase: state.get('searchBar').get('searchPhrase').toJS(),
  location: state.get('route').get('location').get('pathname'),
});

function mapDispatchToProps(dispatch) {
  return {
    searchQuestion: searchPhrase => dispatch(searchQuestion(searchPhrase)),
    onSearchTypeChange: type => dispatch(searchTypeChange(type)),
    onSearchMajorChange: major => dispatch(searchMajorChange(major)),
    onSearchKeywordChange: keyword => dispatch(searchKeywordChange(keyword)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchBar', reducer });

export default compose(
  withReducer,
  withConnect,
)(SearchBar);
