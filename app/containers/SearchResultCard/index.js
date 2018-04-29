/**
 *
 * SearchResultCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Button } from 'antd';

import { endSearch } from 'containers/SearchBar/actions';
import './SearchResultCard.css';

export class SearchResultCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { searching, searchResult } = this.props;
    if (!searching) return null;

    // const aniClass = searching ? 'slideInUp' : 'slideOutDown';

    const results = searchResult.length > 0
    ? searchResult.map(question => (
      <div key={question._id} className="searchresult-item">
        <h3 className="searchresult-item-title">{question.title}</h3>
        <p className="searchresult-item-body">{question.body}</p>
      </div>
    ))
    : <h4 className="no-match-found">No Match Found</h4>;

    return (
      <div className={'searchresult-card animated slideInUp'}>
        <div className="card-heading">
          <h2 className="card-heading-title">Search Results for <span className="searchresult-keyword">{this.props.searchPhrase.keyword}</span>
          </h2>
          <Button type="default" icon="close" shape="circle" onClick={this.props.endSearch} />
        </div>
        <Divider style={{ margin: 0 }} />
        <div className="card-body">
          {results}
        </div>
      </div>
    );
  }
}

SearchResultCard.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object),
  searchPhrase: PropTypes.object,
  endSearch: PropTypes.func,
  searching: PropTypes.bool,
};

const mapStateToProps = state => ({
  searching: state.get('searchBar').get('searching'),
  searchResult: state.get('searchBar').get('searchResult').toJS(),
  searchPhrase: state.get('searchBar').get('searchPhrase').toJS(),
});

function mapDispatchToProps(dispatch) {
  return {
    endSearch: () => dispatch(endSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCard);
