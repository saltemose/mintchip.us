import { RECEIVE_STOCK_MONTHLY_DATA } from '../actions/stock_actions';

const monthlyDataReducer = (state=[], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK_MONTHLY_DATA:
            return Object.assign([], state, action.data)
        default:
            return state;
    }
}

export default monthlyDataReducer;