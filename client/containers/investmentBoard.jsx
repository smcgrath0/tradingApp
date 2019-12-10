import React from 'react';
// import InvestmentBoardStock from '../components/investmentboardstock';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class InvestmentBoard extends React.Component {

  render() {
    // if (this.state.stocks.data) {
    //   let userStocks = this.props.userStocks.map((stock, index) => {
    //     var dayChangeFactor = '';
    //     if (stock.day_change < 0) {
    //       dayChangeFactor = 'red';
    //     } else if (stock.day_change > 0) {
    //       dayChangeFactor = 'green';
    //     }
    //     return (
    //       <InvestmentBoardStock key={index} stock={stock} dayChangeFactor={dayChangeFactor}/>
    //     );
    //   });
    //   return (
    //     <>
    //       <h1>Your Investment Board</h1>
    //       {userStocks}
    //     </>
    //   );
    // }

    return (
      <div className="container" style={{ overflow: 'hidden' }} >
        <div style={{ textAlign: 'center', lineHeight: '300%', fontSize: '2rem', fontFamily: 'Patua One, cursive' }}>
          Current Campaigns
        </div>
        <div className="d-flex flex-wrap justify-content-center p-0">

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    userStocks: state.userStocks
  };
};

export default connect(mapStateToProps)(InvestmentBoard);
