import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
        };

        this.renderStocks = this.renderStocks.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addHiddenClass = this.addHiddenClass.bind(this);
        this.removeHiddenClass = this.removeHiddenClass.bind(this);

        
    }

    componentDidMount() {
        this.props.fetchStocks();
        
    }
    

   



    renderStocks() {
        const { allStocks } = this.props
        let stocks;
        let array;

        if (allStocks && this.state.inputVal.length > 1) {
        stocks = allStocks.filter((stock) => {
            return array = (stock.ticker.toLowerCase().includes(this.state.inputVal.toLowerCase()) || stock.name.toLowerCase().includes(this.state.inputVal.toLowerCase()));
        });
        
        return (
            <ul className={this.state.hidden ? "search-res-hide" : "search-res"}>
                <h4 className="search-list-title">Stocks</h4><br/>
                
                {
                    stocks.sort((a, b) =>((a.name.indexOf(this.state.inputVal) - b.name.indexOf(this.state.inputVal)) || a.name.indexOf(this.state.inputVal) - b.name.indexOf(this.state.inputVal))).map((stock) => {
                        return (
                            <NavLink className="search-res-link" key={stock.ticker} to={`/stocks/${stock.ticker}`}>
                                <ul className="search-res-item" onClick={this.addHiddenClass}>
                                    <p className='search-ticker'>{stock.ticker}</p>
                                    <p className="search-name"> {stock.name}</p>
                                </ul>
                            </NavLink>
                        );
                    })
                }

            </ul>
        );
    } else {
        return (
        <div></div>
        );
    }
}


    handleInput(e) {
        const inputVal = e.target.value;
        this.setState({ inputVal });
    }

    addHiddenClass() {
        this.setState({ hidden: true });
      }
    
    removeHiddenClass() {
        this.setState({ hidden: false });
      }

    

    render() {
        return (
        <div className="searchbar">
            <div>
            <div className='search-bar' onClick={this.removeHiddenClass}>
            
            <svg className="searchbar-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.7171 15.5959C18.1294 14.1533 19 12.1783 19 10C19 5.58172 15.4183 2 11 2C6.58172 2 3 5.58172 3 10C3 14.4183 6.58172 18 11 18C12.6983 18 14.273 17.4708 15.5682 16.5683L19.4696 20.4697C19.7624 20.7626 20.2373 20.7626 20.5302 20.4697C20.8231 20.1768 20.8231 19.7019 20.5302 19.409L16.7171 15.5959ZM17.5 10C17.5 13.5899 14.5899 16.5 11 16.5C7.41015 16.5 4.5 13.5899 4.5 10C4.5 6.41015 7.41015 3.5 11 3.5C14.5899 3.5 17.5 6.41015 17.5 10Z" fill="#B4BDC2"/></svg>
                <input 
                className="searchbar-input"
                type="text"
                placeholder="Search"
                onChange={this.handleInput.bind(this)}
                />
            </div>
            {this.renderStocks()}
        </div>
        
        </div>
        
        )
    }
}

export default SearchBar;