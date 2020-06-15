import * as SearchbarAPIUtil from '../util/searchbar_api_util';

export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';

const receiveStocks = allStocks => ({
    type: RECEIVE_STOCKS,
    allStocks
})

export const fetchStocks = () => dispatch => (
    SearchbarAPIUtil.fetchStocks()
    .then(allStocks => dispatch(receiveStocks(allStocks)))
);