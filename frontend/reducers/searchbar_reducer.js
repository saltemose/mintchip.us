import { RECEIVE_STOCKS } from '../actions/searchbar_actions';

const searchbarReducer = (state=[], action) => {
        Object.freeze(state);
        switch(action.type) {
            case RECEIVE_STOCKS:
                return action.allStocks
            default:
                return state;
        }
    }

export default searchbarReducer; 