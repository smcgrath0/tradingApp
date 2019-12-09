import React from 'react';
// import AppContext from '../context.js';
// import { Link } from 'react-router-dom';

export default class InvestmentBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: {}
    };
    this.getStocks = this.getStocks.bind(this);
  }

  componentDidMount() {
    this.getStocks();
  }

  getStocks() {
    fetch('https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo')
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({
          stocks: res
        });
      });
  }

  render() {
    if (this.state.stocks.data) {
      let campaigns = this.state.stocks.data.map((stock, index) => {
        var dayChangeFactor = '';
        if (stock.day_change < 0) {
          dayChangeFactor = 'red';
        } else if (stock.day_change > 0) {
          dayChangeFactor = 'green';
        }
        return (
          <div key={index} className="yourstocks" style={{ backgroundColor: dayChangeFactor }}>
            <p>{stock.symbol}</p>
            <p>{stock.price}</p>
          </div>
        // <Link to={`/campaign-details/${campaign.campaignID}`} key={campaign.campaignID} style={{ color: '#000000' }}>
        //   <div className='glassCard' style={{ 'flex': '0 0 auto', 'width': '20em', 'height': '18em', 'margin': '1rem', 'borderRadius': '10%', 'cursor': 'pointer', 'overflow': 'hidden' }} >
        //     <div className="container">
        //       <div style={{ 'marginTop': '.3em', 'textAlign': 'center', 'fontSize': '2em' }}>
        //         {campaign.campaignTitle}
        //       </div>
        //       <div style={{ 'marginTop': '1em', 'height': '2em', 'width': '100%', 'borderRadius': '15%', 'textAlign': 'center' }}> {campaign.runSpace} </div>
        //       <div style={{ 'marginTop': '1em', 'marginBottom': '1em', 'width': '100%', 'textAlign': 'center' }}> {campaign.requirements} </div>
        //       <div style={{ 'height': '2em', 'width': '100%', 'borderRadius': '15%', 'textAlign': 'center' }}> {campaign.rewards} </div>
        //     </div>
        //   </div>
        // </Link>
        );
      });
      return campaigns;
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
// AllCampaigns.contextType = AppContext;
