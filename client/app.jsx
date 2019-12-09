import React from 'react';
import InvestmentBoard from './containers/investmentBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Router>
        <Route exact path='/' component={InvestmentBoard}></Route>
        {/* <NavBar />
          <Route exact path='/landing-page' component={LandingPage} />
          <Route path='/company-dashboard/:companyID' component={CompanyDashboard} />
          <Route exact path='/create-campaign/:companyID' component={CreateCampaign} />
          <Route path='/creator-portfolio/:creatorID' component={CreatorPortfolio} />
          <Route path='/upload-submission/:campaignID' component={UploadSubmission}></Route>
          <Route path='/submission-details/:submissionID' component={ViewSubmissionDetails}></Route>
          <Route path='/campaign-details/:campaignID' component={ViewCampaignDetails}></Route>
          <Route path='/settings' component={SwitchUserPage}></Route>
          <Route exact path='/' component={SwitchUserPage}></Route>
          <Route path='/all-campaigns-page' component={AllCampaigns}></Route>
          <Route path='/create-campaign' component={CreateCampaign}></Route> */}
      </Router>
    );
  }
}
