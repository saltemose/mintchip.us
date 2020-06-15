import React from 'react';
import {Link} from 'react-router-dom';
import Searchbar from '../dashboard/searchbar_container';
import StockChart from '../charts/stock_chart_container';
import { render } from 'react-dom';
import { FadeLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
  display: block;
  margin: 0 auto;
`;

class StockCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ticker: this.props.match.params.ticker,
            num_shares: '',
            order_type: 'buy',
            currPrice: '',
            about: 'closed',
            details: 'closed',
            inputVal: "0",
            accountDropdown: 'false',
            review: 'no',
            submitted: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSellButton = this.renderSellButton.bind(this);
        this.getChange = this.getChange.bind(this);
        this.renderAccountDropdown = this.renderAccountDropdown.bind(this);
    }

componentDidMount(){
  const ticker = this.props.match.params.ticker;
  this.props.fetchStock(ticker);
  if (this.props.currentUser) {
    this.props.fetchUserInfo(this.props.currentUser); }
}

componentDidUpdate(prevProps) {
    if ((this.props.match.params.ticker !== prevProps.match.params.ticker) && !this.props.stocks || !prevProps) {
      const ticker = this.props.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }

getChange(change) {
    this.setState({change: change})
}

renderMore() {
    this.setState({about: 'open'})
}

renderLess() {
    this.setState({about: 'closed'})
}

renderDetails() {
    this.setState({details: 'open'})
}

renderLessDetails() {
    this.setState({details: 'closed'})
}

handleInput(e) {
    
    const inputVal = e.target.value;
    this.setState({ inputVal, num_shares: inputVal })
    const { stock } = this.props
    this.setState({currPrice: stock["quote"].latestPrice})
}

renderAccountDropdown() {
    if (this.state.accountDropdown === 'false') {
    this.setState({ accountDropdown: 'true'})}
    else this.setState({ accountDropdown: 'false'})
}

renderSellButton() {
    const stock = this.props.match.params
    const { currentUser} = this.props
    if (currentUser.hasOwnProperty('stocks')) {
    if (currentUser.stocks.find(el => el.symbol === stock.ticker && el.shares > 0)) {
      return (
        <a 
          className={this.state.change > 0 ? (this.state.order_type === 'sell' ? "buy-btn" : 'buy-btn-b' ) : ( this.state.order_type === 'buy' ? 'buy-btn-b' : 'sell-btn')} 
          onClick={() => this.setState({order_type: 'sell'})}
        >
          Sell {`${stock.ticker}`}
        </a>
      );
    }}
    return null;
  }

  handleSubmit(e) {
      
    e.preventDefault();
    this.setState({ submitted: true });

    let { ticker, num_shares, order_type, currPrice } = this.state;
    let transaction = {
      ticker,
      num_shares: parseInt(num_shares),
      order_type,
      price: currPrice
    };

    this.props.createTransaction(transaction)
  }

render() {
        let change = this.state.change
        const { stock }  = this.props;
        let previousClose;
        Object.keys(stock).map((each) => {
            if (each === 'quote')
            previousClose = stock["quote"].previousClose
        })

        const display = (stock) ? (
            <div className="stock-card-overall">
            <div className="stock-card">
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
                                        <div className="acct-drpdwn-item" onClick={this.props.logout}>
                                        <div className="acct-drpdwn-item-img">
                                        <img className="logout-image" src={window.logoutImage} alt=""/>
                                        </div>
                                        <div className="acct-drpdwn-item-word">
                                        <a className="account-dropdown-link" onClick={this.props.logout}>Log Out</a>
                                        </div>
                                    </div>
                                        </div>
                                    
                                        </div>
                
                </div>
                </div>
                </div>
            <div>
                {   
                    Object.keys(stock).map((key, i) => {
                        if (key === "quote")  
                        return (
                        <div className="stock-card-details" key={i}>
                            <div className="stock-card-company-name">{stock["quote"].companyName}</div>
                            <div className="stock-card-price">${stock["quote"].latestPrice.toFixed(2)}</div>
                        </div>)
                    })
                    
                    

                }
            </div>

            <div className="stock-chart">
            <StockChart parentCallback={this.getChange} ticker={this.props.match.params.ticker} previousClose={previousClose}/>
            </div>
             
            <div>
            <div className="news-title-3">About<a className={this.state.details ==="closed" ? change > 0 ? "show-more" : "show-more-neg" : change > 0 ? 'show-less' : "show-less-neg" } onClick={() => this.renderDetails()}>Show More</a><a className={this.state.details ==="closed" ? change > 0 ? "show-less" : "show-less-neg" : change > 0 ? "show-more" : "show-more-neg"} onClick={() => this.renderLessDetails()}>Show Less</a></div>
                {
                    Object.keys(stock).map((key, i) => {
                        if (key === "company")
                        return (
                            <div className="stocks-about-main-container">
                            <div className={this.state.about === 'closed' ? 'stocks-about-container' : 'stocks-about-container-open'} key={i}>
                                <div className="stocks-about">{stock["company"].description}
                                <a className={this.state.about === 'open' ? "read-less" : "read-less-2"} onClick={() => this.renderLess()}>Read Less</a>
                                </div>
                            </div><a className={this.state.about === 'closed' ? "read-more" : "read-more-2"} onClick={() => this.renderMore()}>Read More</a>
                            </div>
                        )
                    })
                }
            </div>
            <div className="spacer"></div>
            

            <div>
            {
                Object.keys(stock).map((key, i) => {
                    if (key === "quote")
                    return (
                        <div className={this.state.details === "closed" ? "stocks-about-detail-container" : "stocks-about-detail-container-open"}>
                        <div className="stocks-about-detail-container-2">
                        <div className="stocks-about-detail-title">CEO</div>
                        <div className="stocks-about-detail" key={i}>{stock["company"].CEO}</div>
                        </div>

                        <div className="stocks-about-detail-container-2">
                        <div className="stocks-about-detail-title">Employees</div>
                        <div className="stocks-about-detail" key={i}>{stock["company"].employees}</div>
                        </div>

                        <div className="stocks-about-detail-container-2">
                        <div className="stocks-about-detail-title">Headquarters</div>
                        <div className="stocks-about-detail" key={i}>{stock["company"].city}, {stock["company"].state}</div>
                        </div>

                        <div className="stocks-about-detail-container-2">
                        <div className="stocks-about-detail-title">Exchange</div>
                        <div className="stocks-about-detail" key={i}>{stock["company"].exchange}</div>
                        </div>

                        <div className="stocks-about-detail-container-2">
                            <div className="stocks-about-detail-title">52-Week High</div>
                            <div className="stocks-about-detail" key={i}>${stock["quote"].week52High.toFixed(2)}</div>
                            </div>

                            <div className="stocks-about-detail-container-2">
                            <div className="stocks-about-detail-title">52-Week Low</div>
                            <div className="stocks-about-detail" key={i}>${stock["quote"].week52Low.toFixed(2)}</div>
                            </div>
                            <div className="stocks-about-detail-container-2">
                            <div className="stocks-about-detail-title">Price-Earnings Ratio</div>
                            <div className="stocks-about-detail" key={i}>{stock["quote"].peRatio}</div>
                            </div>
                        
                            <div className="stocks-about-detail-container-2">
                            <div className="stocks-about-detail-title">Average Volume</div>
                            <div className="stocks-about-detail" key={i}>{stock["quote"].avgTotalVolume}</div>
                            </div>

                            <div className="stocks-about-detail-container-2">
                            <div className="stocks-about-detail-title">Previous Close</div>
                        <div className="stocks-about-detail" key={i}>{stock["quote"].previousClose}</div>
                        </div>
                        
                        <div className="stocks-about-detail-container-2">
                        <div className="stocks-about-detail-title">YTD Change</div>
                        <div className="stocks-about-detail" key={i}>{stock["quote"].ytdChange.toFixed(2)}%</div>
                        </div>
                        
                        <div className="stocks-about-detail-container-2">
                        <div className="stocks-about-detail-title">Sector</div>
                        <div className="stocks-about-detail" key={i}>{stock["company"].sector}</div>
                        </div>
                        </div>
                    )
                   
                })
                }
            </div>
            <br/>
            {
                Object.keys(stock).map((key, i) => {
                    if (key === "quote") 
                    return (
            <div className="popular-collections-container-stock-card">
                <div className="pop-coll-title">Collections</div>
                <br/>
                {stock["company"].tags.map((each) => {
                    return (
                <div className="collection-btn-container">
                <a className={change > 0 ? "collection"  : "collection-neg"} href="">{each}</a>
                </div>)})}
            </div>)})}
            <br/>

            <div className="stock-news-container-main-2">
                {
                    Object.keys(stock).map((key, i) => {
                        if (key === "news")
                        return (
                            <ul className="news-container-2">
                                <div className="news-title-2">News</div>
                                {stock[key].map((article) => {
                                    return (
                                    <a key={article.headline} href={`${article.url}`} className="news-list-2">
                                    <ul className="news-list-item-link">
                                    <div className="news-list-item">
                                    <div className="left-news-item">
                                    <div className="news-list-source">{article.source}</div>
                                    
  
                                    <div className="news-list-title">{article.headline}</div>
                            
                                    <div className="news-list-content">{article.summary}</div>
                                    </div>

                                    <div className="right-news-item">
                                    <div className="news-image"><img src={`${article.image}`} alt=""/></div>
                                    </div>
                                    </div>
                                    </ul>
                                </a>
                              
                                        )
                                    })
                                }
                            </ul>
                        ) 
                    
                        
                    }

                    )
                    
                }
               
            </div>

            <div className="stock-card-sidebar">
            <form onSubmit={this.handleSubmit}>
                <div className="stock-sidebar-container-title">
                <a onClick={() => this.setState({order_type: 'buy'})} className={this.state.change > 0 ? (this.state.order_type === 'sell' ? "buy-btn-b" : 'buy-btn' ) : ( this.state.order_type === 'buy' ? 'sell-btn' : 'buy-btn-b')}>Buy {this.props.match.params.ticker}</a>
                {this.renderSellButton()}
                <a className="three-dots">•••</a>
                </div>
            
                <div className="stock-card-sidebar-content">
                    <div className="sidebar-text">
                    <div className="stock-sidebar-text">Shares</div>
                    </div>
                    <div className="sidebar-input">
                    <input className={change > 0 ? "shares-input" : "shares-input-neg"} type="number" placeholder="0" onChange={this.handleInput.bind(this)}/>
                    </div>
                    <br/>
                    <div className="sidebar-text">
                    <div className="stock-sidebar-text">Market Price</div>
                    </div>
                    <div className="sidebar-input">
                    {Object.keys(stock).map((key, i) => {
                        if (key === "quote")
                        return (
                        <div className="" key={i}>
                            <div className="stock-sidebar-text">${stock["quote"].latestPrice.toFixed(2)}</div>
                        </div>)})}
                    </div>
                    <br/>
                    <div className="sidebar-text-estimate">
                    <div className="sidebar-text">
                    <div className="stock-sidebar-text">Estimated Cost</div>
                    </div>

                    <div className="sidebar-input">
                    {Object.keys(stock).map((key, i) => {
                        if (key === "quote")
                        return (
                            <div className="stock-sidebar-text">{(this.state.inputVal*
                        stock["quote"].latestPrice).toFixed(2)}</div>)}
                        )}
                    
                    </div>
                </div>
                <div className={this.state.review === 'yes' ? "review-dropped" : "review-hidden"}>
                You are placing a good for day market order to {this.state.order_type} {this.state.inputVal} {(this.state.inputVal > 1 || this.state.inputVal == 0) ? `shares` : `share` } of {this.state.ticker}. Your order will be placed as soon as possible and executed at the best available price.

                </div>
                <div>
                <div onClick={() => this.setState({review: 'yes'})} className={(change > 0 && this.state.review === 'no') ? "stock-sidebar-btn-b" : (change < 0 && this.state.review) === 'no' ? "stock-sidebar-btn-neg-b" : "review-hidden"}> <div className="review">Review Order</div></div>
                <button className={(change > 0 && this.state.review === 'yes') ? "stock-sidebar-btn" : (change < 0 && this.state.review) === 'yes' ? "stock-sidebar-btn-neg" : "review-hidden"}>Submit</button>
                <div onClick={() => this.setState({review: 'no'})} className={(change > 0 && this.state.review === 'yes') ? "stock-sidebar-btn-c" : (change < 0 && this.state.review) === 'yes' ? "stock-sidebar-btn-neg-c" : "review-hidden"}>
                    <div className="review">
                        Edit
                    </div>
                </div>
                </div>
                
           
                </div>
                <div className="sidebar-text-2">
                <div className={change > 0 ? "stock-sidebar-text-2" : "stock-sidebar-text-2-neg"}>${(this.props.currentUser.buyingPower)} Buying Power Available</div>
            </div>
            </form>
            </div>
            
            </div>
            </div>) : (
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
            )
            return (
            <div>{display}</div>   
            )
        
    }
}

export default StockCard;