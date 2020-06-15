import { RECEIVE_STOCK_WEEKLY_DATA } from '../actions/stock_actions';

const dataReducer = (state=[], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK_WEEKLY_DATA:
            return Object.assign([], state, action.data)
        default:
            return state;
    }
}

export default dataReducer;