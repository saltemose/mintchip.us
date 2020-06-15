import { RECEIVE_STOCK_3M_DATA } from '../actions/stock_actions';

const threeMDataReducer = (state=[], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK_3M_DATA:
            return Object.assign([], state, action.data)
        default:
            return state;
    }
}

export default threeMDataReducer;