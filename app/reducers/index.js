import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const root = (state = { filter: '', RssData: [] }, action) => {
    switch (action.type) {
        case types.FILTER:
            return {
                ...state,
                filter: action.filter
            };
        case types.RSS_SEARCH:
            return {
                ...state,
                RssData: action.RssData
            };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    root,
    routing
});

export default rootReducer;
