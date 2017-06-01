import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable, RssSearch } from '../actions';
import ProductTable from '../components/ProductTable';
import { filterableTable } from '../styles/filterableTable.scss';

const FilterableTable = ({ filter, RssData, onFilter, onRssSearch }) => {
    let input;
    let RssURL;
    return (
        <div className={filterableTable}>
            <div>RSS URL:</div>
            <input ref={node => { RssURL = node; }} />
            <button onClick={() => onRssSearch(RssURL.value)} >Search</button>
            <div>RSS Filter:</div>
            <input
                value={filter}
                ref={node => { input = node; }}
                onChange={() => onFilter(input.value)} />
            <ProductTable filter={filter} RssData={RssData} />
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    RssData: PropTypes.array,
    onFilter: PropTypes.func,
    onRssSearch: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.root.filter,
        RssData: state.root.RssData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText)),
        onRssSearch: RssURL => {
            const URL = 'http://127.0.0.1:3001/proxy?url=' + RssURL;
            fetch(URL).then((response) => {
                return response.json();
            }).then((RssData) => {
                if (RssData !== '') {
                    dispatch(RssSearch(RssData));
                }
            });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
