import * as StockAPIUtil from "../util/stock_api_util";


export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCK_INTRADAY_DATA = 'RECEIVE_STOCK_INTRADAY_DATA';
export const RECEIVE_STOCK_WEEKLY_DATA = 'RECEIVE_STOCK_WEEKLY_DATA';
export const RECEIVE_STOCK_MONTHLY_DATA = 'RECEIVE_STOCK_MONTHLY_DATA';
export const RECEIVE_STOCK_3M_DATA = 'RECEIVE_STOCK_3M_DATA';
export const RECEIVE_STOCK_1Y_DATA = 'RECEIVE_STOCK_1Y_DATA';
export const RECEIVE_STOCK_5Y_DATA = 'RECEIVE_STOCK_5Y_DATA';


const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock
})

const receiveStockIntraDayData = (ticker, data) => ({
    type: RECEIVE_STOCK_INTRADAY_DATA,
    ticker,
    data
  });

const receiveStockWeeklyData = (ticker, data) => ({
    type: RECEIVE_STOCK_WEEKLY_DATA,
    ticker,
    data
});

const receiveStockMonthlyData = (ticker, data) => ({
    type: RECEIVE_STOCK_MONTHLY_DATA,
    ticker,
    data
});

const receiveStock3MData = (ticker, data) => ({
    type: RECEIVE_STOCK_3M_DATA,
    ticker,
    data
});

const receiveStock1YData = (ticker, data) => ({
    type: RECEIVE_STOCK_1Y_DATA,
    ticker,
    data
});

const receiveStock5YData = (ticker, data) => ({
    type: RECEIVE_STOCK_5Y_DATA,
    ticker,
    data
});


export const fetchStock = (ticker) => dispatch => (
    StockAPIUtil.fetchStock(ticker)
    .then(stock => dispatch(receiveStock(stock)))
);

export const fetchStockIntraDayData = ticker => dispatch => {
    StockAPIUtil.fetchStockIntraDayData(ticker)
      .then(data => dispatch(receiveStockIntraDayData(ticker, data)))
  };

export const fetchStockWeeklyData = ticker => dispatch => {
      StockAPIUtil.fetchStockWeeklyData(ticker)
      .then(data => dispatch(receiveStockWeeklyData(ticker, data)))
  };

export const fetchStockMonthlyData = ticker => dispatch => {
    StockAPIUtil.fetchStockMonthlyData(ticker)
    .then(data => dispatch(receiveStockMonthlyData(ticker, data)))
};

export const fetchStock3MData = ticker => dispatch => {
    StockAPIUtil.fetchStock3MData(ticker)
    .then(data => dispatch(receiveStock3MData(ticker, data)))
};

export const fetchStock1YData = ticker => dispatch => {
    StockAPIUtil.fetchStock1YData(ticker)
    .then(data => dispatch(receiveStock1YData(ticker, data)))
};

export const fetchStock5YData = ticker => dispatch => {
    StockAPIUtil.fetchStock5YData(ticker)
    .then(data => dispatch(receiveStock5YData(ticker, data)))
};

