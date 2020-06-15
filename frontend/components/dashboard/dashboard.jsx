import React from 'react';
import { withRouter } from 'react-router-dom';
import RHLogo from '../logo';
import SearchBarContainer from './searchbar_container';
import PortfolioContainer from './portfolio_container';

class Dashboard extends React.Component {

    render() {
        return (
        <div className="dashboard-container">
    
                <PortfolioContainer/>
              

           
        </div>
        )
    }
}

export default withRouter(Dashboard)