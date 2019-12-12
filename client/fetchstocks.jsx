import { fetchStocksPending, fetchStocksSuccess, fetchStocksError } from './actions/action';

export default function fetchStocks() {
  return dispatch => {
    dispatch(fetchStocksPending());
    fetch('https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo')
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.error) {
          throw (res.error);
        }
        dispatch(fetchStocksSuccess(res.data));
        // return res.data;
      })
      .catch(error => {
        dispatch(fetchStocksError(error));
      });
  };
}
