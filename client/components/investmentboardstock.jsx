import React from 'react';
// import StockDetails from '../containers/stockdetails';
import { Link } from 'react-router-dom';

export default class InvestmentBoardStock extends React.Component {
  render() {
    // console.log(this.props.stock);
    return (
      <Link to='/stock-details/1'>
        <div className="InvestmentBoardStockContainer" style={{ color: this.props.dayChangeFactor }}>
          <div className="InvestmentBoardStockSymbol">
            {this.props.stock.symbol}
          </div>
          <div className="InvestmentBoardStockPriceContainer">
            <div className="InvestmentBoardStockPrice">
              ${this.props.stock.price}
            </div>
            <div className="InvestmentBoardStockPct">
              {this.props.stock.change_pct}%
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
