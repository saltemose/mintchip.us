import { connect } from 'react-redux';
import StockSidebar from './stock_sidebar';
import { fetchUserInfo } from '../../actions/session_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],

});

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: (user) => dispatch(fetchUserInfo(user))

});

export default connect(mapStateToProps, mapDispatchToProps)(StockSidebar);