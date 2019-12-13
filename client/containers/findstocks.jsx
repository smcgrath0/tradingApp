import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchStocksA from '../fetchstocks';
import { getStocksError, getStocks, getStocksPending } from '../reducers/rootReducer';

class FindStocks extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchStocks } = this.props;
    fetchStocks();
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === true || pending === undefined) return false;
    // more tests
    return true;
  }
  render() {
    var stocks = this.props.stocks.map((stock, index) => {
      var color;
      if (stock.day_change < 0) {
        color = 'red';
      } else if (stock.day_change > 0) {
        color = 'green';
      }
      return (
        <Link key={index} to={'/stock-details/' + stock.symbol} className="text-dark">
          <div className="findStockStockContainer">
            <p className="findStocksStockName">{stock.name}</p>
            <p className={'highlighted ' + color}>{stock.symbol}</p>
            <p className={'highlighted ' + color}>{stock.change_pct}%</p>
          </div>
        </Link >
      );
    });
    if (!this.shouldComponentRender()) return <div>true</div>;
    return (
      <div className="findStocksContainer">

        <h2>Search</h2>
        <div className="searchbar">
          <form className="findStocksSearchContainer">
            <input className="searchInput" type="text" placeholder="Search..." name="search"></input>
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
        <h2>Top Today</h2>
        <div className="topPicks">
          {stocks}
        </div>
        <h2>For you</h2>
        <div className="suggestedForYou">
          {stocks}
        </div>
        <h2>Most Searched</h2>
        <div className="releventSearches">
          {stocks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: getStocksError(state),
  stocks: getStocks(state),
  pending: getStocksPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStocks: fetchStocksA
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindStocks);
