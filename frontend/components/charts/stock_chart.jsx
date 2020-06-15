import React from 'react';
import { LineChart, Line, YAxis, Tooltip, ReferenceLine, XAxis } from 'recharts';


class StockChart extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            active: '1D',
            fetched5Y: false,
            ticker: '', 
            change: '',
        }
    
        this.render1DChart = this.render1DChart.bind(this);
        this.renderChart = this.renderChart.bind(this)
        this.render5YChart = this.render5YChart.bind(this);
    }

    componentDidMount() {
        this.setState({ticker: `${this.props.ticker}`, active: '1D'});
        this.props.fetchStockIntraDayData(this.props.ticker);
        this.render1DChart();
        this.props.fetchStockWeeklyData(this.props.ticker)
        setTimeout(() => {
            this.props.fetchStockMonthlyData(this.props.ticker);
        }, 1000);
        setTimeout(() => {
            this.props.fetchStock3MData(this.props.ticker);
        }, 1000);
        setTimeout(() => {
            this.props.fetchStock1YData(this.props.ticker);
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        if ((this.props.ticker !== prevProps.ticker) && !this.props.stocks) {
          this.props.fetchStockIntraDayData(this.props.ticker);
            this.setState({active: '1D'})
        }
      }
    


    render1DChart() {
        this.setState({active: '1D'});
        
         
        }

    renderChart(range) {
        this.setState({active: range});


    }

    render5YChart() {
        this.setState({active: '5Y'});
        this.props.fetchStock5YData(this.props.ticker);
    }
    
    render() {

        let main = [];
        let marginRight;
        let prices = [];
        let previousClose;
        let today
        const { data, data2, data3, data4, data5, data6} = this.props
        if (this.state.active === '1D') {
        for (let i = 0; i < data.length; i+=5){
            if (data[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${data[i].label}`,
                price: `${data[i].close}`
            })
            prices.push(`${data[i].close}`) }}
            else {
            main.push({
                time: `${data[i].label}`,
                price: `${data[i].close}`}) 
            prices.push(`${data[i].close}`)
            }
           
         } if (prices.length < 78) {
             marginRight = 78 - prices.length 
             for (let i = 0; i < marginRight; i++)
             main.push({
                    time: `${i}`,
                    price: null
             })
         }
        previousClose = this.props.previousClose
        today = "Today"}
       

        if (this.state.active === '1W'){
        for (let i = 0; i < data2.length; i+=3){
            if (data2[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${data2[i].label}`,
                price: `${data2[i].close}`
            })
            prices.push(`${data2[i].close}`) }}
            else {
            main.push({
                time: `${data2[i].label}`,
                price: `${data2[i].close}`}) 
            prices.push(`${data2[i].close}`)
            }
        
        }
        marginRight = 30
        today = "Past Week"}

        if (this.state.active === '1M') {
        for (let i = 0; i < data3.length; i+=2){
            if (data3[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${data3[i].label}`,
                price: `${data3[i].close}`
            })
            prices.push(`${data3[i].close}`) }}
            else {
            main.push({
                time: `${data3[i].label}`,
                price: `${data3[i].close}`}) 
            prices.push(`${data3[i].close}`)
            }
        
        }
        marginRight = 30
        today = "Past Month" }

        if (this.state.active === '3M') {
        for (let i = 0; i < data4.length; i+=2){
            if (data4[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${data4[i].label}`,
                price: `${data4[i].close}`
            })
            prices.push(`${data4[i].close}`) }}
            else {
            main.push({
                time: `${data4[i].label}`,
                price: `${data4[i].close}`}) 
            prices.push(`${data4[i].close}`)
            }
        
        }
        marginRight = 30
        today = "Past Quarter" }

        if (this.state.active === '1Y') {
        for (let i = 0; i < data5.length; i+=2){
            if (data5[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${data5[i].label}`,
                price: `${data5[i].close}`
            })
            prices.push(`${data5[i].close}`) }}
            else {
            main.push({
                time: `${data5[i].label}`,
                price: `${data5[i].close}`}) 
            prices.push(`${data5[i].close}`)
            }
        
        }
        marginRight = 30
        today = "Past Year" }

        if (this.state.active === '5Y') {
        for (let i = 0; i < data6.length; i+=7){
            if (data6[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${data6[i].label}`,
                price: `${data6[i].close}`
            })
            prices.push(`${data6[i].close}`) }}
            else {
            main.push({
                time: `${data6[i].label}`,
                price: `${data6[i].close}`}) 
            prices.push(`${data6[i].close}`)
            }
        
        }
        marginRight = 30
        today = "Past 5 Years" }
        
        let change = (prices[prices.length-1] - prices[0]);
        let origPrice = prices[0];
        this.props.parentCallback(change)
        let changeDisplay = '$0.00'
        change < 0 ? changeDisplay = "-$" + parseFloat(Math.abs(change)).toFixed(2) : changeDisplay = "$" + change.toFixed(2)
        let priceChange = '0.00%'
        let currPrice = prices[prices.length-1]
        priceChange = (change/(currPrice - change)*100).toFixed(2)
        let max = Math.max(...prices);
        let min = Math.min(...prices);
        
        const display = priceChange === undefined ? (
            <div className='stock-loading'>
     
        <FadeLoader
          className={override}
            height={15}
            width={3}
            margin={1}
            radius={1}
          color={'rgba(0,200,5,1);'}
          loading={true}
        />
   
      </div>
        ) :
        (
            
            <div className="full-chart">
           {  <div> 
               <div className="stock-card-price-container">
            <div className={change > 0 ? "stock-card-price-change" : "stock-card-price-change-neg"}>{changeDisplay}</div> 
            <div className={change > 0 ? "stock-card-price-change" : "stock-card-price-change-neg"}>({priceChange}%)  <span className="today">{today}</span></div>
            </div>
              <div><LineChart width={700} height={220} data={main} margin={{ top: 5, right: 30, left: 0, bottom: 10 }}>
                   <YAxis
                    hide={true}
                    domain={[min, max]}
                  />
                  
                  <ReferenceLine y={previousClose} stroke="gray" strokeWidth={1} strokeDasharray="1.5 6"/>
              <Line type="linear" dataKey="price" dot={false} stroke={change > 0 ? "rgba(0,200,5,1)" : "rgba(255,80,0,1)"} strokeWidth={2}/>
              </LineChart></div></div>
           } 
            <div>
               
            </div>
            <br/>
            <div className="chart-buttons">
            <div className="chart-button"><a className={this.state.active === '1D' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={this.render1DChart}>1D</a></div>
            <div className="chart-button"><a className={this.state.active === '1W' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('1W')}>1W</a></div>
            <div className="chart-button"><a className={this.state.active === '1M' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('1M')}>1M</a></div>
            <div className="chart-button"><a className={this.state.active === '3M' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('3M')}>3M</a></div>
            <div className="chart-button"><a className={this.state.active === '1Y' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('1Y')}>1Y</a></div>
            <div className="chart-button"><a className={this.state.active === '5Y' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={this.render5YChart}>5Y</a></div>
          </div>
          </div>
        ) 
            return (
                <div>{display}</div>
            )
    }
    }

export default StockChart;