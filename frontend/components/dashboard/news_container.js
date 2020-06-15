import { connect } from 'react-redux';
import News from './news';
import {fetchNews } from '../../actions/news_actions';

const mapStateToProps = state => ({
    allNews: state.entities.news
});

const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(News);