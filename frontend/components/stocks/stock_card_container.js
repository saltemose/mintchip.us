import { connect } from 'react-redux';
import StockCard from './stock_card';
import { fetchStock, fetchStockIntraDayData } from '../../actions/stock_actions';
import { fetchUserInfo } from '../../actions/session_actions';
import { logout } from '../../actions/session_actions';
import { createTransaction } from '../../actions/transaction_actions';

const mapStateToProps = (state) => ({
    stock: state.entities.stocks,
    currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
    fetchStock: (ticker) => dispatch(fetchStock(ticker)),
    fetchUserInfo: (user) => dispatch(fetchUserInfo(user)),
    logout: () => dispatch(logout()),
    fetchStockIntraDayData: (ticker) => dispatch(fetchStockIntraDayData(ticker)),
    createTransaction: transaction => dispatch(createTransaction(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockCard);