import React from 'react';
// import StockDetails from '../containers/stockdetails';
import { Link } from 'react-router-dom';

export default class InvestmentBoardStock extends React.Component {
  render() {
    return (
      <Link to={'/stock-details/' + this.props.stock.symbol}>
        <div className="InvestmentBoardStockContainer" style={{ color: this.props.dayChangeFactor }}>
          <div className="InvestmentBoardStockSymbol">
            {this.props.stock.symbol}
          </div>
          <div className="InvestmentBoardStockPriceContainer">
            <div className="InvestmentBoardStockPrice" style={{ color: this.props.dayChangeFactor }}>
              ${this.props.stock.price}
            </div>
            <div className="InvestmentBoardStockPct" style={{ color: this.props.dayChangeFactor }}>
              {this.props.stock.change_pct}%
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
