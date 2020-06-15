import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { fetchTransactions } from '../../actions/transaction_actions';
import { fetchUserInfo } from '../../actions/session_actions';
import { fetchStock } from '../../actions/stock_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],

});

const mapDispatchToProps = dispatch => ({
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchUserInfo: (user) => dispatch(fetchUserInfo(user)),
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);