import React from 'react';
import InvestmentBoardStock from '../components/investmentboardstock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import fetchStocksA from '../fetchstocks';
import { getPortfolioStocksError, getStocks, getPortfolioStocksPending } from '../reducers/rootReducer';

class InvestmentBoard extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }
  componentDidMount() {
    const { fetchStocks } = this.props;
    const stockSymbols = this.props.userStocks.map(userStocks => {
      return userStocks.symbol;
    });
    fetchStocks(stockSymbols);
  }
  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === true || pending === undefined) return false;
    // more tests
    return true;
  }
  render() {
    if (!this.shouldComponentRender()) return <div>true</div>;
    if (this.props.userStocks.length > 0) {
      let userStocks = this.props.userStocks.map((stock, index2) => {
        var xr = this.props.stocks.map(stock2 => {
          var dayChangeFactor = '';
          if (stock.change_pct < 0) {
            dayChangeFactor = 'red';
          } else if (stock.change_pct > 0) {
            dayChangeFactor = 'green';
          }
          if (stock2.symbol === stock.symbol) {
            return (
              <InvestmentBoardStock key={index2} stock={stock2} dayChangeFactor={dayChangeFactor} userQuantity={stock.quantity} />
            );
          }
        });
        return xr;

      });
      return (
        <>
          <h1 className="InvestmentBoardHeader">Portfolio</h1>
          {userStocks}
        </>
      );
    }

    return (
      <div className="container" style={{ overflow: 'hidden' }} >
        <div style={{ textAlign: 'center', lineHeight: '300%', fontSize: '2rem', fontFamily: 'Patua One, cursive' }}>
          Portfolio
        </div>
        <div className="d-flex flex-wrap justify-content-center p-0">
          Go Invest!
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  // let id = ownProps.match.props.params.symbol
  return {
    userInfo: state.root.userInfo,
    userStocks: state.root.userStocks,
    error: getPortfolioStocksError(state),
    stocks: getStocks(state),
    pending: getPortfolioStocksPending(state)
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStocks: fetchStocksA
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestmentBoard));
