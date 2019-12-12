import React from 'react';
import InvestmentBoardStock from '../components/investmentboardstock';
import { connect } from 'react-redux';
// import AppContext from '../context.js';
// import { Link } from 'react-router-dom';

class InvestmentBoard extends React.Component {

  // getStocks() {
  //   fetch('https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo')
  //     .then(res => res.json())
  //     .then(res => {
  //       // console.log(res);
  //       this.setState({
  //         stocks: res
  //       });
  //     });
  // }

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
          Current Campaigns
        </div>
        <div className="d-flex flex-wrap justify-content-center p-0">
          {/* {campaigns} */}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  // console.log()
  // let id = ownProps.match.props.params.symbol
  return {
    userInfo: state.userInfo,
    userStocks: state.userStocks
  };
};

// store.dispatch({type: })
export default connect(mapStateToProps)(InvestmentBoard);
// AllCampaigns.contextType = AppContext;
