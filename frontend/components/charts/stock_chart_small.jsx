import React from 'react';
import { LineChart, Line, YAxis, Tooltip, ReferenceLine } from 'recharts';


class StockChartSmall extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            active: '1D',
            ticker: '', 
        }

    }

    componentDidMount() {
            this.setState({active: '1D'})
    }

    componentDidUpdate() {
        
      }

  
    
    render() {
        

        let main = [];
        let prices = [];
        let marginRight; 
        const { stockData } = this.props

        
        for (let i = 0; i < stockData.length; i+=15){
            if (stockData[i].close === null) {
            for (let i = i-1; i >= i-5; i--) {
            main.push({
                time: `${stockData[i].label}`,
                price: `${stockData[i].close}`
            })
            prices.push(`${stockData[i].close}`) }}
            else {
            main.push({
                time: `${stockData[i].label}`,
                price: `${stockData[i].close}`}) 
            prices.push(`${stockData[i].close}`)
            }
           
        
        }
        if (prices.length < 26) {
            marginRight = 26 - prices.length 
            for (let i = 0; i < marginRight; i++)
            main.push({
                   time: `${i}`,
                   price: null
            })}
       

        let change = (prices[prices.length-1] - prices[0]);
        let max = Math.max(...prices);
        let min = Math.min(...prices);

        return (
            
            <div className="small-chart">
           {
              <div><LineChart width={60} height={30} data={main} margin={{ top: 1, right: 0, left: 5, bottom: 1 }}>
                   <YAxis
                    hide={true}
                    domain={[min, max]}
                  />
                 <ReferenceLine y={this.props.openPrice} stroke="gray" strokeWidth={.8} strokeDasharray="1.5 4"/>
              <Line type="linear" dataKey="price" dot={false} stroke={change > 0 ? "rgba(0,200,5,1)" : "rgba(255,80,0,1)" } strokeWidth={1}/>
              </LineChart></div>
           } 
        
          </div>
        )}
    }

export default StockChartSmall;