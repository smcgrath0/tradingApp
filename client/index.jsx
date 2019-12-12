import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer, stocksReducer } from './reducers/rootReducer';

// const dispatch = useDispatch();

// const initState = {
//   userInfo: { userName: 'sammy27', firstName: 'Sam', lastName: 'White' },
//   userStocks: [{ symbol: 'SNAP', price: '14.14', stockID: 1, change_pct: 1.52 }, { symbol: 'APLE', price: '257.74', stockID: 2, change_pct: -2.52 }, { symbol: 'FB', price: '200.17', stockID: 3, change_pct: 5.52 }]
// };

// const initState = {
//   userInfo: { },
//   userStocks: []
// };

// function myreducer(state = initState, action) {
//   if (action.type === 'GET_YOUR_STOCKS') {
//     return {
//       userInfo: action.userInfo,
//       userStocks: action.userStocks
//     };
//   }
//   if (action.type === 'ADD_YOUR_STOCKS') {
//     return {
//       userInfo: state.userInfo,
//       userStocks: [...state.userStocks, actions.stock]
//     };
//   }
// }

const middlewares = [thunk];

const store = createStore(combineReducers({
  root: rootReducer,
  stocks: stocksReducer
}), applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
