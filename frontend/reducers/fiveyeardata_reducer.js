import { RECEIVE_STOCK_5Y_DATA } from '../actions/stock_actions';

const fiveyearDataReducer = (state=[], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK_5Y_DATA:
            return Object.assign([], state, action.data)
        default:
            return state;
    }
}

export default fiveyearDataReducer;