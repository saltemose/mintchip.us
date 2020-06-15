import { combineReducers } from 'redux';

import users from './users_reducer';
import stocks from './stocks_reducer';
import news from './news_reducer';
import transactions from './transactions_reducer';
import searchbar from './searchbar_reducer';
import weeklydata from './weeklydata_reducer';
import monthlydata from './monthlydata_reducer';
import threemdata from './threemdata_reducer';
import yearlydata from './yearlydata_reducer';
import fiveyeardata from './fiveyeardata_reducer';

export default combineReducers({
  users,
  stocks,
  weeklydata,
  monthlydata,
  threemdata,
  yearlydata,
  fiveyeardata,
  news,
  transactions,
  searchbar
});