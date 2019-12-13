import React from 'react';
import { connect } from 'react-redux';
import { removeStock } from '../actions/stockactions';

class StockDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.removeStock(this.props.stock[0].symbol);
    this.props.history.push('/');
  }
  render() {
    const stock = this.props.stock[0] ? (
      <div>
        <p>{this.props.stock[0].name}</p>
        <p>{this.props.stock[0].symbol}</p>
        <p>{this.props.stock[0].price}</p>
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
  let id = ownProps.match.params.stockSymbol;
  return {
    stock: state.stocks.stocks.filter(stock => {
      if (stock.symbol === id) return stock;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeStock: symbol => {
      dispatch(removeStock(symbol));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockDetails);
