import { connect } from 'react-redux';
import StockChart from '../charts/stock_chart';
import { fetchStockIntraDayData, fetchStockWeeklyData, fetchStockMonthlyData, fetchStock3MData, fetchStock1YData, fetchStock5YData } from '../../actions/stock_actions';

const mapStateToProps = (state) => ({
    data: state.entities.stocks, 
    data2: state.entities.weeklydata,
    data3: state.entities.monthlydata,
    data4: state.entities.threemdata,
    data5: state.entities.yearlydata,
    data6: state.entities.fiveyeardata
});

const mapDispatchToProps = dispatch => ({
    fetchStockIntraDayData: (ticker) => dispatch(fetchStockIntraDayData(ticker)),
    fetchStockWeeklyData: (ticker) => dispatch(fetchStockWeeklyData(ticker)),
    fetchStockMonthlyData: (ticker) => dispatch(fetchStockMonthlyData(ticker)),
    fetchStock3MData: (ticker) => dispatch(fetchStock3MData(ticker)),
    fetchStock1YData: (ticker) => dispatch(fetchStock1YData(ticker)),
    fetchStock5YData: (ticker) => dispatch(fetchStock5YData(ticker))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockChart);