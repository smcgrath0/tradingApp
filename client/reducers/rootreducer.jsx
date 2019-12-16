// import { FETCH_STOCKS_PENDING, FETCH_STOCKS_SUCCESS, FETCH_STOCKS_ERROR } from '../actions/action';

const initState = {
  userInfo: {},
  userStocks: [],
  modalStatus: 'none',
  stockQuantity: 1,
  pending: undefined
};

export const rootReducer = (state = initState, action) => {
  if (action.type === 'STOCK_QUANTITY') {
    return {
      ...state,
      stockQuantity: action.quantity
    };
  }
  if (action.type === 'REMOVE_STOCK') {
    let newUserStocks = state.userStocks.filter(stock => {
      return action.stock.symbol !== stock.symbol;
    });
    return {
      ...state,
      userStocks: newUserStocks
    };
  }
  if (action.type === 'ADD_STOCK') {
    var counter = 0;
    let newUserStocks = state.userStocks.map(stock => {
      if (stock.symbol === action.symbol) {
        let quantity = parseInt(stock.quantity);
        counter = 1;
        quantity += parseInt(state.stockQuantity);
        stock.quantity = quantity;
      }
      return stock;
    });
    if (!counter) {
      newUserStocks = state.userStocks;
      newUserStocks.push({ symbol: action.symbol, quantity: state.stockQuantity });
    }
    return {
      ...state,
      userStocks: newUserStocks,
      pending: true
    };
  }
  if (action.type === 'ADD_MODAL') {
    let newmodalStatus = 'flex';
    if (state.modalStatus === 'flex') {
      newmodalStatus = 'none';
    }
    return {
      ...state,
      modalStatus: newmodalStatus
    };
  }
  if (action.type === 'REMOVE_MODAL') {
    let newmodalStatus = 'none';
    if (state.modalStatus === 'none') {
      newmodalStatus = 'flex';
    }
    return {
      ...state,
      modalStatus: newmodalStatus
    };
  }
  switch (action.type) {
    case 'FETCH_STOCKS_PENDING':
      return {
        ...state,
        pending: true
      };
    case 'FETCH_STOCKS_SUCCESS':
      return {
        ...state,
        pending: false,
        stocks: action.stocks
      };
    case 'FETCH_STOCKS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

const initialState = {
  pending: undefined,
  stocks: [],
  error: null
};

export function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_STOCKS_PENDING':
      return {
        ...state,
        pending: true
      };
    case 'FETCH_STOCKS_SUCCESS':
      return {
        ...state,
        pending: false,
        stocks: action.stocks
      };
    case 'FETCH_STOCKS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const getStocks = state => {
  if (state.stocks.stocks === undefined) return [];
  return state.stocks.stocks;
};
export const getStocksPending = state => state.stocks.pending;
export const getStocksError = state => state.stocks.error;

export const getPortfolioStocksPending = state => state.root.pending;
export const getPortfolioStocksError = state => state.root.error;
