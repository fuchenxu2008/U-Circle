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
  beginSearch,
  endSearch,
  searchTypeChange,
  searchMajorChange,
  searchKeywordChange,
  searchQuestion,
  clearSearch,
} from './actions';
import './SearchBar.css';

const Search = Input.Search;
const InputGroup = Input.Group;

export class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onSearchTypeChange(this.props.searchType);
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  async onMajorChange(major) {
    await this.props.onSearchMajorChange(major);
    if (major !== '') {
      if (this.props.searching === false) {
        this.props.beginSearch();
      }
      console.log(this.props.searchPhrase);
      this.search();
    } else {
      this.props.endSearch();
    }
  }

  async onKeywordChange(keyword) {
    await this.props.onSearchKeywordChange(keyword);
    if (keyword !== '') {
      if (this.props.searching === false) {
        this.props.beginSearch();
      }
      console.log(this.props.searchPhrase);
      this.search();
    } else {
      this.props.endSearch();
    }
  }

  search = () => {
    this.props.searchQuestion(this.props.searchPhrase);
  }

  render() {
    return (
      <div>
        <InputGroup compact className="searchbar">
          <Input
            style={{ width: '30%' }}
            placeholder="Major"
            onChange={e => this.onMajorChange(e.target.value)}
            className="searchbar-major"
          />
          <Search
            style={{ width: '70%' }}
            className="searchbar-enter"
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
  searching: PropTypes.bool,
  searchType: PropTypes.string,
  searchQuestion: PropTypes.func,
  onSearchKeywordChange: PropTypes.func,
  onSearchTypeChange: PropTypes.func,
  searchPhrase: PropTypes.object,
  beginSearch: PropTypes.func,
  endSearch: PropTypes.func,
  clearSearch: PropTypes.func,
};

const mapStateToProps = state => ({
  searching: state.get('searchBar').get('searching'),
  searchPhrase: state.get('searchBar').get('searchPhrase').toJS(),
  location: state.get('route').get('location').get('pathname'),
});

function mapDispatchToProps(dispatch) {
  return {
    beginSearch: () => dispatch(beginSearch()),
    endSearch: () => dispatch(endSearch()),
    clearSearch: () => dispatch(clearSearch()),
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
