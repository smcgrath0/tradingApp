// import { FETCH_STOCKS_PENDING, FETCH_STOCKS_SUCCESS, FETCH_STOCKS_ERROR } from '../actions/action';

const initState = {
  // userInfo: {},
  // userStocks: []
};

export const rootReducer = (state = initState, action) => {
  if (action.type === 'REMOVE_STOCK') {
    let newUserStocks = state.userStocks.filter(stock => {
      return action.stockID !== stock.stockID;
    });
    return {
      ...state,
      userStocks: newUserStocks
    };
  }
  return state;
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

export const getStocks = state => state.stocks.stocks;
export const getStocksPending = state => state.stocks.pending;
export const getStocksError = state => state.stocks.error;
