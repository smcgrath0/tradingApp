const initState = {
  userInfo: { userName: 'sammy27', firstName: 'Sam', lastName: 'White' },
  userStocks: [{ symbol: 'SNAP', price: '14.14', stockID: 1 }, { symbol: 'APLE', price: '257.74', stockID: 2 }, { symbol: 'FB', price: '200.17', stockID: 3 }]
};

const rootReducer = (state = initState, action) => {
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

export default rootReducer;
