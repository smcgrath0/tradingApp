import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { bindActionCreators } from 'redux';
import { removeStock, addStock, addModal, removeModal, changeStockQuantity } from '../actions/stockactions';

class StockDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleRemoveStock = this.handleRemoveStock.bind(this);
    this.addModal = this.addModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.changeStockQuantity(event.target.value);
  }
  handleAddStock() {
    this.props.addModal();
  }
  handleRemoveStock() {
    this.props.removeStock(this.props.stock[0].symbol);
    this.props.history.push('/');
  }
  addModal() {
    var modalStatus = 'none';
    if (this.props.modalStatus) {
      modalStatus = this.props.modalStatus;
    }
    return (
      <div className='addModalContainer' style={{ display: modalStatus }}>
        <div className="addModal">
          <div className="modalCloseContainer">
            <i className="fas fa-times" onClick={this.handleAddStock}></i>
          </div>
          <div className="addModalName">{this.props.stock[0].name}</div>
          <div className="addModalPrice">${this.props.stock[0].price} x <input id="quantityOfStocks" type="number" min="1" value={this.props.stockQuantity} onChange={this.handleChange}/></div>
          <div className="addModalTotal">
            Total: ${document.querySelector('#quantityOfStocks')
              ? this.props.stock[0].price * document.querySelector('#quantityOfStocks').value
              : this.props.stock[0].price
            }
          </div>
          <div className="addModalButtonContainer">
            <button className="addModalButton" onClick={ () => {
              if (document.querySelector('#quantityOfStocks').value) {
                this.props.addStock(this.props.stock[0].symbol, this.props.stockQuantity);
                this.props.removeModal();
                this.props.history.push('/');
              }
            }}>Buy Shares</button>
          </div>
        </div>
      </div>
    );
  }
  render() {
    // stock layout
    // 52_week_high: "2035.80"
    // 52_week_low: "1307.00"
    // change_pct: "0.03"
    // close_yesterday: "1760.33"
    // currency: "USD"
    // day_change: "0.61"
    // day_high: "1768.88"
    // day_low: "1755.00"
    // eps: "22.57"
    // gmt_offset: "-18000"
    // last_trade_time: "2019-12-13 16:00:01"
    // market_cap: "873068756992"
    // name: "Amazon.com, Inc."
    // pe: "78.03"
    // price: "1760.94"
    // price_open: "1765.00"
    // shares: "495796992"
    // stock_exchange_long: "NASDAQ Stock Exchange"
    // stock_exchange_short: "NASDAQ"
    // symbol: "AMZN"
    // timezone: "EST"
    // timezone_name: "America/New_York"
    // volume: "2426806"
    // volume_avg: "2767850"
    const stock = this.props.stock[0] ? (
      <div className="detailsContainer">
        <p className="detailsName">{this.props.stock[0].name}</p>
        <p className="detailsSymbol">{this.props.stock[0].symbol}</p>
        <p className="detailsPrice">{this.props.stock[0].price}</p>
        <div>
          <button className="detailsAddButton" onClick={this.handleAddStock}>Add Stock</button>
        </div>
        <div>
          <button className="detailsRemoveButton" onClick={this.handleRemoveStock}>Remove Stock</button>
        </div>
      </div>
    ) : (
      <div>
        Loading...
      </div>
    );
    return (
      <>
        <div>
          { stock }
        </div>
        {this.addModal()}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.stockSymbol;
  return {
    stock: state.stocks.stocks.filter(stock => {
      if (stock.symbol === id) return stock;
    }),
    modalStatus: state.root.modalStatus,
    stockQuantity: state.root.stockQuantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeStock: symbol => {
      dispatch(removeStock(symbol));
    },
    addStock: (symbol, quantity) => {
      dispatch(addStock(symbol, quantity));
    },
    addModal: () => {
      dispatch(addModal());
    },
    removeModal: () => {
      dispatch(removeModal());
    },
    changeStockQuantity: quantity => {
      dispatch(changeStockQuantity(quantity));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockDetails));
