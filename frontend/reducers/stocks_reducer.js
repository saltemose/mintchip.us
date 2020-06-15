import {RECEIVE_STOCK, RECEIVE_STOCK_INTRADAY_DATA, } from '../actions/stock_actions';

const stocksReducer = (state=[], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK:
            return Object.assign([], state, action.stock);
        case RECEIVE_STOCK_INTRADAY_DATA:
            return Object.assign([], state, action.data);
        default:
            return state;
    }
}

export default stocksReducer;