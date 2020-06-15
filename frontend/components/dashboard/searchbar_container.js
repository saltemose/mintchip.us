import { connect } from 'react-redux';
import SearchBar from './searchbar';
import { fetchStocks } from '../../actions/searchbar_actions';

const mapStateToProps = state => ({
    allStocks: state.entities.searchbar 
});

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);