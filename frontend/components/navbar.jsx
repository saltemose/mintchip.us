import React from 'react';
import {Link} from 'react-router-dom';
import Searchbar from '../components/dashboard/searchbar_container';

class Navbar extends React.Component {
    constructor(props){
        super(props);

        this.state = {accountDropdown: 'false'}
    }

    render() {
        let change = this.props.change
        return (
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
        )
    }
}

export default Navbar;