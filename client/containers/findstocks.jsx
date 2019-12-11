import React from 'react';

export default class FindStocks extends React.Component {
  // constructor(props) {
  //   super(props);

  // }
  render() {
    return (
      <div className="findStocksContainer">

        <h2>Search</h2>
        <div className="searchbar">
          <p><i className="fas fa-search"></i>Search...</p>
        </div>
        <h2>Top Today</h2>
        <div className="topPicks">
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
        </div>
        <h2>For you</h2>
        <div className="suggestedForYou">
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
        </div>
        <h2>Most Searched</h2>
        <div className="releventSearches">
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
          <div className="findStockStockContainer">
            <p>Stock Name</p>
            <p className="highlighted red">Stock Symbol</p>
            <p className="highlighted red">stock day_percentage</p>
          </div>
        </div>
      </div>
    );
  }
}
