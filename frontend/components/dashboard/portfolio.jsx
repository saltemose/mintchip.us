import React from 'react';
import { fetchStock, fetchStocks } from '../../util/stock_api_util';
import { NavLink } from 'react-router-dom';
import StockSidebar from '../dashboard/stock_sidebar';
import NewsContainer from './news_container';
import RHLogo from '../logo';
import Searchbar from './searchbar_container';
import PortfolioChart from '../charts/portfolio_chart';
import { FadeLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
  display: block;
  margin: 0 auto;
`;

class Portfolio extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            accountDropdown: 'false',
            active: '1D',
        };

        this.getChange = this.getChange.bind(this);

    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.fetchUserInfo(this.props.currentUser);
            this.props.fetchTransactions()
        }
       
        
    }


    getChange(change) {
        this.setState({change: change})
    }

    render() {
        const { currentUser } = this.props
        let balance;
        let stocks;
        balance = currentUser.balance;
        stocks = currentUser.stocks
        
        const display = currentUser.hasOwnProperty('balance_data') ? 
        (     
        <PortfolioChart parentCallback={this.getChange} balance={balance} currentUser={this.props.currentUser} logout={this.props.logout}/>
                    
        ) : (<div className='stock-loading'>
     
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
            <div className="main-body">{display}</div>
            
        )
    }
}

export default Portfolio;