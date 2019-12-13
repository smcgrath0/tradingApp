import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footerContainer">
        <div className="yourstockBoard">
          <Link to='/investment-board/2' className="text-dark">
            <i className="fas fa-chart-line"></i>
          </Link>
        </div>
        <div className="findStocks">
          <Link to='/find-stocks/2' className="text-dark">
            <i className="fas fa-search"></i>
          </Link>
        </div>
        <div className="stockSuggestions">
          <Link to='/stock-suggestions/2' className="text-dark">
            <i className="fas fa-brain"></i>
          </Link>
        </div>
        <div className="userdashboard">
          <Link to='/user-dashboard/2' className="text-dark">
            <i className="fas fa-user"></i>
          </Link>
        </div>
      </div>
    );
  }
}
