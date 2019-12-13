import React from 'react';
import InvestmentBoardStock from '../components/investmentboardstock';
import { connect } from 'react-redux';

class InvestmentBoard extends React.Component {

  render() {

    if (this.props.userStocks) {
      let userStocks = this.props.userStocks.map((stock, index) => {
        var dayChangeFactor = '';
        if (stock.change_pct < 0) {
          dayChangeFactor = 'red';
        } else if (stock.change_pct > 0) {
          dayChangeFactor = 'green';
        }
        return (
          <InvestmentBoardStock key={index} stock={stock} dayChangeFactor={dayChangeFactor}/>
        );
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
    userInfo: state.userInfo,
    userStocks: state.userStocks
  };
};

export default connect(mapStateToProps)(InvestmentBoard);
