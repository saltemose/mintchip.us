import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { LineChart, Line } from 'recharts';
import StockChartSmall from '../charts/stock_chart_small_container';


const StockSidebar = ({ currentUser }) => {

    let previousClose;
    Object.keys

        return (
            <div className="stock-sidebar-container">
                <div className="stock-sidebar-container-title">Stocks</div>
                {
                Object.keys(currentUser).map(key => {
                    if (key === "stocks")
                    return (
                    <div className="stock-sidebar-container-2">
                        {currentUser[key].map((stock)=> {
                        return (
                        
                            <Link to={`/stocks/${stock.symbol}`} className="stock-sidebar-link">
                            <div className="stock-sidebar-item">
                                <div className="stock-sidebar-item-left">
                                <div className="stock-sidebar-symbol">{stock.symbol}</div>
                                <div className="stock-sidebar-shares">{stock.shares} Shares </div>
                                </div>
                                <div className="stock-sidebar-item-middle">
                                    
                                <StockChartSmall key={stock} stockData={stock.intradayData} openPrice={stock.openPrice}/>
                                </div>
                                <div className="stock-sidebar-item-right">
                                <div className="stock-sidebar-price">${stock.price}</div>
                                </div>
                                
                            </div>
                            </Link>
                      
                        ) }
                        )}
                    </div>)})}
                
            </div>
        
        );
                        
};


        
export default StockSidebar;