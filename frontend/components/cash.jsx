import React from 'react';
import Searchbar from '../components/dashboard/searchbar_container'
import {Link} from 'react-router-dom'
import { FadeLoader } from 'react-spinners';

class Cash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {change: 1}
    }

    componentDidMount() {
       this.props.fetchUserInfo(this.props.currentUser)
    }

    render() {
        let change = this.state.change
        const display = this.props.currentUser.hasOwnProperty('balance_data') ? 
        (     
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
                                        <div className="acct-drpdwn-item">
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

           

                    
        

            <div className="cash-page-left">
            <h1 className="cash-page-title">Cash + Margin</h1>
            <div className="balance-2">${this.props.buyingPower}</div>
            
            <div className="cash-page-container">
                <div className="cpc-left">
                <svg class="css-8atqhb" width="99" height="140" viewBox="0 0 99 110" fill="none"><path d="M49.148 27.8433L49.148 109.657H69.9977V27.8433H49.148Z" fill="#01130f"></path><path d="M68.8373 109.658C85.4958 109.658 99.0004 91.3439 99.0004 68.7516C99.0004 46.1593 85.4958 27.8447 68.8373 27.8447C52.1788 27.8447 38.6745 46.1593 38.6745 68.7516C38.6745 91.3439 52.1788 109.658 68.8373 109.658Z" fill="#02320c"></path><path d="M49.1539 109.658C65.8124 109.658 79.317 91.3439 79.317 68.7516C79.317 46.1593 65.8124 27.8447 49.1539 27.8447C32.4954 27.8447 18.991 46.1593 18.991 68.7516C18.991 91.3439 32.4954 109.658 49.1539 109.658Z" fill="#1bdf1c"></path><path opacity="0.6" d="M62.9445 70.0239L48.4621 92.1711L33.9797 70.0239L48.4621 47.877L62.9445 70.0239Z" fill="#ffffff"></path><path d="M7.16364 0.917465L7.16364 82.7314H28.0131L28.0131 0.917465H7.16364Z" fill="#02320c"></path><path d="M26.8473 82.7211C43.5058 82.7211 57.0101 64.4065 57.0101 41.8142C57.0101 19.2219 43.5058 0.907227 26.8473 0.907227C10.1888 0.907227 -3.31555 19.2219 -3.31555 41.8142C-3.31555 64.4065 10.1888 82.7211 26.8473 82.7211Z" fill="#02320c"></path><path d="M7.16282 82.7211C23.8213 82.7211 37.3256 64.4065 37.3256 41.8142C37.3256 19.2219 23.8213 0.907227 7.16282 0.907227C-9.49567 0.907227 -23 19.2219 -23 41.8142C-23 64.4065 -9.49567 82.7211 7.16282 82.7211Z" fill="#1bdf1c"></path><path opacity="0.6" d="M13.1731 37.9521H-6.07941V21.7705H13.1731C17.3819 21.7705 20.7919 25.1795 20.7919 29.3867V30.3361C20.7919 34.5433 17.3819 37.9521 13.1731 37.9521Z" fill="#ffffff"></path><path opacity="0.6" d="M13.1731 61.9227H-6.07941V45.7412H13.1731C17.3819 45.7412 20.7919 49.1502 20.7919 53.3574V54.3068C20.7919 58.514 17.3819 61.9227 13.1731 61.9227Z" fill="#ffffff"></path></svg>
                </div>
                <div className="cpc-right">
                    <div className="cpc-title">Buying Power</div>
                    <div className='cash-bp'>${this.props.buyingPower}</div>
                    <div className='cash-detail'>
                    The amount available to invest on MintChip Financial (stocks, options, ETFs).
                    </div>
                </div>
            </div>

            <div className="cash-page-container">
                <div className="cpc-left">
                <svg class="css-8atqhb" width="92" height="145" viewBox="0 -5 92 132" fill="none"><path d="M-12 17.7232L-12 131.859H56.3196V17.7232H-12Z" fill="#1bdf1c"></path><g opacity="0.6"><path d="M47.7603 34.9331C42.9757 34.9331 39.0989 31.0577 39.0989 26.2749C39.0989 25.7625 39.1523 25.2714 39.2377 24.7803H5.27566C5.29702 25.0258 5.31829 25.2713 5.31829 25.5275C5.31829 30.716 1.11048 34.9224 -4.07996 34.9224C-4.13336 34.9224 -4.17609 34.9117 -4.22949 34.9117V114.575C-3.94113 114.543 -3.64214 114.533 -3.34311 114.533C1.4415 114.533 5.31829 118.408 5.31829 123.191C5.31829 123.735 5.26488 124.269 5.16876 124.782H39.2591C39.163 124.269 39.1096 123.735 39.1096 123.191C39.1096 118.408 42.9864 114.533 47.771 114.533C48.038 114.533 48.2943 114.554 48.5613 114.575V34.8903C48.2836 34.9224 48.0273 34.9331 47.7603 34.9331Z" fill="#ffffff"></path></g><path d="M22.1622 89.4547C32.5905 89.4547 41.0443 82.8872 41.0443 74.7859C41.0443 66.6846 32.5905 60.1172 22.1622 60.1172C11.7339 60.1172 3.28003 66.6846 3.28003 74.7859C3.28003 82.8872 11.7339 89.4547 22.1622 89.4547Z" fill="#1bdf1c"></path><path d="M76.9061 0.920898V8.03097C80.5907 8.03097 83.5918 11.0309 83.6024 14.7034L83.9121 101.221C83.9227 103.015 83.2286 104.702 81.9684 105.972C80.7081 107.242 79.0207 107.947 77.2371 107.947L31.1427 108.107C27.4582 108.107 24.4571 105.107 24.4357 101.435L24.126 14.917C24.1153 13.1235 24.8095 11.4366 26.0698 10.1768C27.33 8.9064 29.0174 8.20182 30.8009 8.20182L76.874 8.04165L76.9061 0.920898ZM76.8954 0.920898C76.8741 0.920898 76.8633 0.920898 76.842 0.920898L30.7795 1.08093C23.1541 1.11296 16.9919 7.31578 17.0132 14.9384L17.3229 101.456C17.3549 109.068 23.528 115.217 31.132 115.217C31.1534 115.217 31.164 115.217 31.1854 115.217L77.2478 115.057C84.8733 115.036 91.0356 108.822 91.0142 101.2L90.7046 14.6822C90.6832 7.07024 84.5102 0.920898 76.8954 0.920898Z" fill="#02320c"></path><path d="M78.3685 115.045L48.1871 115.151L47.7812 1.01501L77.9627 0.90828C83.4628 0.886928 87.927 5.32801 87.9484 10.8154L88.2795 105.063C88.3009 110.561 83.858 115.034 78.3685 115.045Z" fill="#02320c"></path><path opacity="0.6" d="M64.3032 29.765L58.4933 29.7864C56.9234 29.797 55.6418 28.5267 55.6418 26.9574L55.6097 17.1248C55.599 15.5554 56.8699 14.2744 58.4399 14.2744L64.2498 14.253C65.8198 14.2423 67.1013 15.5128 67.1013 17.0821L67.1334 26.9146C67.144 28.484 65.8731 29.765 64.3032 29.765Z" fill="#ffffff"></path></svg>
                </div>
                <div className="cpc-right">
                    <div className="cpc-title">Withdraw or Spend</div>
                    <div className="cash-bp">${this.props.buyingPower}</div>
                    <div className="cash-detail">
                    The amount available to transfer to your bank account, spend with your MintChip debit card, or withdraw from ATMs.
                    </div>
                </div>

            </div>


            </div>


            <div className="cash-page-sidebar">

            </div>

            </div>
            ) : (<div className='stock-loading'>
     
            <FadeLoader
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

export default Cash;