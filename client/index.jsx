import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

// const dispatch = useDispatch();

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

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
