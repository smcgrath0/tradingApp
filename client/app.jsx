import React from 'react';
import InvestmentBoard from './containers/investmentBoard';
import UserDashboard from './containers/userdashboard';
import FindStocks from './containers/findstocks';
import StockSuggestions from './containers/stocksuggestions';
import Footer from './components/footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Router>
        <Route exact path='/' component={InvestmentBoard}></Route>

        <Route path='/user-dashboard/:userID' component={UserDashboard} />
        <Route path='/investment-board/:userID' component={InvestmentBoard} />
        <Route path='/stock-suggestions/:userID' component={StockSuggestions} />
        <Route path='/find-stocks/:userID' component={FindStocks} />
        {/* <NavBar />
          <Route exact path='/landing-page' component={LandingPage} />
          <Route exact path='/create-campaign/:companyID' component={CreateCampaign} />
          <Route path='/creator-portfolio/:creatorID' component={CreatorPortfolio} />
          <Route path='/upload-submission/:campaignID' component={UploadSubmission}></Route>
          <Route path='/submission-details/:submissionID' component={ViewSubmissionDetails}></Route>
          <Route path='/campaign-details/:campaignID' component={ViewCampaignDetails}></Route>
          <Route path='/settings' component={SwitchUserPage}></Route>
          <Route exact path='/' component={SwitchUserPage}></Route>
          <Route path='/all-campaigns-page' component={AllCampaigns}></Route>
          <Route path='/create-campaign' component={CreateCampaign}></Route> */}
        <Footer />
      </Router>
    );
  }
}
