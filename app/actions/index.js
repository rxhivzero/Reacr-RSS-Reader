import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function RssSearch(RssData) {
    return {
        type: types.RSS_SEARCH,
        RssData
    };
}
