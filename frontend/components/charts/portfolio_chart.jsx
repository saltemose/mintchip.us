import React from 'react';
import { LineChart, Line, YAxis, ReferenceLine } from 'recharts';
import Searchbar from '../../components/dashboard/searchbar_container';
import StockSidebar from '../dashboard/stock_sidebar';
import NewsContainer from '../dashboard/news_container';
import {Link} from 'react-router-dom';

class PortfolioChart extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            active: '',
            fetched5Y: false,
            change: '',
            accountDropdown: 'false'
        }

        this.renderChange = this.renderChange.bind(this)
        this.render1DChart = this.render1DChart.bind(this);
        this.render5YChart = this.render5YChart.bind(this);
        this.renderAccountDropdown = this.renderAccountDropdown.bind(this);
    }

    componentDidMount() {
       this.setState({active: '1D'})
       
           
     
    }

    renderAccountDropdown() {
        if (this.state.accountDropdown === 'false') {
        this.setState({ accountDropdown: 'true'})}
        else this.setState({ accountDropdown: 'false'})
    }

    render1DChart() {
        this.setState({active: '1D'})
                }

    renderChart(range) {
        this.setState({active: range})
    }

    render5YChart() {
        this.setState({active: '5Y'})
    }

    renderChange(change) {
        this.props.parentCallback(change)
    }
    
    render() {
        const { currentUser } = this.props
        let main = [];
        let marginRight;
        let prices = [];
        let previousClose;
        let today
        
        if (this.state.active === '1D' && currentUser && currentUser.hasOwnProperty('daily_data') ){
         let balanceData
        balanceData = currentUser.daily_data
        for (let i = 0; i < balanceData.length; i++){
            if (balanceData[i].balance === null) {
                
                    main.push({
                        time: `${balanceData[i].time}`,
                        price: `${balanceData[i].balance}`}) }
            else {
            main.push({
                time: `${balanceData[i].time}`,
                price: `${balanceData[i].balance}`}) 
            prices.push(`${balanceData[i].balance}`)
         }}
        previousClose = this.props.previousClose
        today = "Today"}

        if (this.state.active === '1W' && currentUser && currentUser.hasOwnProperty('balance_data') ){
            let balanceData
            balanceData = currentUser.balance_data
            
            for (let i = balanceData.length-8; i < balanceData.length - 1; i++){
               
                main.push({
                    time: `${balanceData[i].time}`,
                    price: `${balanceData[i].balance}`}) 
                prices.push(`${balanceData[i].balance}`)
                
            
            }
            marginRight = 30
            today = "Past Week"}

            if (this.state.active === '1M' && currentUser && currentUser.hasOwnProperty('balance_data')) {
                let balanceData
                balanceData = currentUser.balance_data
                
                for (let i = balanceData.length-23; i < balanceData.length - 2; i++){
                   
                    main.push({
                        time: `${balanceData[i].time}`,
                        price: `${balanceData[i].balance}`}) 
                    prices.push(`${balanceData[i].balance}`)
                    
                
                }
                marginRight = 30
                today = "Past Month" }
        
                if (this.state.active === '3M' && currentUser && currentUser.hasOwnProperty('balance_data')) {
                    let balanceData
                    balanceData = currentUser.balance_data
                    
                    for (let i = balanceData.length-67; i < balanceData.length - 1; i++){
                       
                        main.push({
                            time: `${balanceData[i].time}`,
                            price: `${balanceData[i].balance}`}) 
                        prices.push(`${balanceData[i].balance}`)
                        
                    
                    }
                marginRight = 30
                today = "Past Quarter" }
        
                if (this.state.active === '1Y' && currentUser && currentUser.hasOwnProperty('balance_data')) {
                    let balanceData
                    balanceData = currentUser.balance_data
                    
                    for (let i = balanceData.length-264; i < balanceData.length - 1; i++){
                       
                        main.push({
                            time: `${balanceData[i].time}`,
                            price: `${balanceData[i].balance}`}) 
                        prices.push(`${balanceData[i].balance}`)
                        
                    
                    }
                marginRight = 30
                today = "Past Year" }
        
                if (this.state.active === '5Y' && currentUser && currentUser.hasOwnProperty('balance_data')) {
                    let balanceData
                    balanceData = currentUser.balance_data
                    
                    for (let i = 0; i <= balanceData.length-1; i++){
                       
                        main.push({
                            time: `${balanceData[i].time}`,
                            price: `${balanceData[i].balance}`}) 
                        prices.push(`${balanceData[i].balance}`)
                        
                    
                    }
                marginRight = 30
                today = "All Time" }


        let change = (prices[prices.length-1] - prices[0]);

        let changeDisplay 
        change < 0 ? changeDisplay = "-$" + parseFloat(Math.abs(change)).toFixed(2) : changeDisplay = "$" + change.toFixed(2)
        let currPrice = prices[prices.length-1]
        let priceChange;
        priceChange = (change/(currPrice - change)*100).toFixed(2)
        let max = Math.max(...prices);
        let min = Math.min(...prices);


        return (
            <div className="cash-page">
                
                <div className="navbar-stock-card">
                <div className="navbar-header">
                <a className="nav-link-logo" href="/"><img className="logo-image" src={window.RHLogo}></img></a>
                <div className="nav-link"><Searchbar/></div>
                <div className="nav-link-b">
                <a className={change > 0 ? "nav-link" : "nav-link-neg"}>Free Stocks</a>
                <a className={change > 0 ? "nav-link" : "nav-link-neg"}href="/">Portfolio</a>
                <Link to="/cash" className={change > 0 ? "nav-link" : "nav-link-neg"}>Cash</Link>
                <a className={change > 0 ? "nav-link" : "nav-link-neg"}>Messages</a>

                <a className={this.state.accountDropdown === "true" ? change > 0 ? "nav-link-selected" : "nav-link-selected-neg" : change > 0 ? "nav-link" : "nav-link-neg"} onClick={this.renderAccountDropdown}>Account
                            </a>
                            <div className={this.state.accountDropdown === 'true' ? "account-dropdown" : "account-dropdown-hidden"}>
                                 <br></br>
                                 <div className="account-dropdown-menu">
                                     <div className="acct-drpdwn-header">
                                        <div className="acct-drpdwn-name">
                                            {this.props.currentUser.username}
                                        </div>
                                        <div className="acct-drpdwn-value">
                                                <div className="acct-drpdwn-value-l">
                                                    ${this.props.currentUser.balance}
                                                    <p className="a-d">
                                                        Portfolio Value
                                                    </p>
                                                </div>
                                                <div className="acct-drpdwn-value-r">
                                                    ${this.props.currentUser.buyingPower}
                                                    <p className="a-d">
                                                        Buying Power
                                                    </p>
                                                </div>
                                                </div>
                                        </div>
                                        <div onClick={this.props.logout} className="acct-drpdwn-item">
                                        <div className="acct-drpdwn-item-img">
                                        <img className="logout-image" src={window.logoutImage} alt=""/>
                                        </div>
                                        <div className="acct-drpdwn-item-word">
                                        <a className="account-dropdown-link">Log Out</a>
                                        </div>
                                    </div>
                                        </div>
                                    
                                        </div>
                
                </div>
                </div>
                </div>

            <div className="cash-page-main">
            <div className="cash-page-left">
                <div className="porfolio-container">
                    <div className="balance">
                    ${this.props.balance}
                    </div>
                </div>
            <div>
                {  <div className="portfolio-chart"> 
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
            <br/>
            <div className="chart-buttons-2">
            <div className="chart-button"><a className={this.state.active === '1D' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={this.render1DChart}>1D</a></div>
            <div className="chart-button"><a className={this.state.active === '1W' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('1W')}>1W</a></div>
            <div className="chart-button"><a className={this.state.active === '1M' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('1M')}>1M</a></div>
            <div className="chart-button"><a className={this.state.active === '3M' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('3M')}>3M</a></div>
            <div className="chart-button"><a className={this.state.active === '1Y' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={() => this.renderChart('1Y')}>1Y</a></div>
            <div className="chart-button"><a className={this.state.active === '5Y' ? change > 0 ? 'chart-choice-active' : 'chart-choice-active-neg' : change > 0 ? 'chart-choice' : 'chart-choice-neg'} onClick={this.render5YChart}>ALL</a></div>
          </div>
          </div>
          <br/>
          <div className="popular-collections-container">
                <div className="pop-coll-title">Popular Collections<a className={this.state.details ==="closed" ? change > 0 ? "show-more" : "show-more-neg" : change > 0 ? 'show-less' : "show-less-neg" } onClick={() => this.renderDetails()}>Show More</a><a className={this.state.details ==="closed" ? change > 0 ? "show-less" : "show-less-neg" : change > 0 ? "show-more" : "show-more-neg"} onClick={() => this.renderLessDetails()}>Show More</a></div>
                <br/>
                
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">100 Most Popular</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Upcoming Earnings</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">New On Mint Chip</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Technology</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Oil and Gas</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Finance</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Software Service</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Energy</a>
                </div> 
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Manufacturing</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Consumer Products</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Social Media</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Health</a>
                </div>
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">Entertainment</a>
                </div>
          <br/><br/>
          <div className="stock-news-container-main">
          <NewsContainer/>
          </div>
          </div>
          
          </div>
          <div className="sidebar">
        <StockSidebar currentUser = {currentUser} />
        </div>
          </div>
          
          </div>
        )}
    }

export default PortfolioChart;