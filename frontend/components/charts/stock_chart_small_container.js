import { connect } from 'react-redux';
import StockChartSmall from '../charts/stock_chart_small';
import { fetchStockIntraDayData} from '../../actions/stock_actions';

const mapStateToProps = (state) => ({
    data: state.entities.stocks, 
});

const mapDispatchToProps = dispatch => ({
    fetchStockIntraDayData: (ticker) => dispatch(fetchStockIntraDayData(ticker)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockChartSmall);