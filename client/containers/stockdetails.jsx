import React from 'react';
import { connect } from 'react-redux';

class StockDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.removeStock(this.props.stock[0].stockID);
    this.props.history.push('/');
  }
  render() {
    const stock = this.props.stock[0] ? (
      <div>
        <p>{this.props.stock[0].symbol}</p>
        <p>{this.props.stock[0].price}</p>
        <p>{this.props.stock[0].stockID}</p>
        <div>
          <button onClick={this.handleClick}>Remove Stock</button>
        </div>
      </div>
    ) : (
      <div>
        Loading...
      </div>
    );
    return (
      <div>
        { stock }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  let id = ownProps.match.params.stockID;
  return {
    stock: state.userStocks.filter(stock => {
      if (stock.stockID === parseInt(id)) return stock;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeStock: id => {
      dispatch({ type: 'REMOVE_STOCK', 'stockID': id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockDetails);
