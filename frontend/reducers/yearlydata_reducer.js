import { RECEIVE_STOCK_1Y_DATA } from '../actions/stock_actions';

const yearlyDataReducer = (state=[], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK_1Y_DATA:
            return Object.assign([], state, action.data)
        default:
            return state;
    }
}

export default yearlyDataReducer;