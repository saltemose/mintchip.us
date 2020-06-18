import { connect } from 'react-redux';
import Cash from './cash';
import {fetchUserInfo } from '../actions/session_actions';
import { logout } from '../actions/session_actions';
import { createDeposit } from '../actions/deposit_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    buyingPower: state.entities.users[state.session.id].buyingPower
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    createDeposit: deposit => dispatch(createDeposit(deposit)),
    fetchUserInfo: (user) => dispatch(fetchUserInfo(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cash);