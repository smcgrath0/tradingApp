import { fetchStocksPending, fetchStocksSuccess, fetchStocksError } from './actions/action';

export default function fetchStocks() {
  return dispatch => {
    dispatch(fetchStocksPending());
    fetch('https://api.worldtradingdata.com/api/v1/stock?symbol=AMZN,APLE,TSLA&api_token=UzV3PJAFNejLh0lKz5hM6u14VXljJ5vZ5QCedmb57pFOd2dElnOesMyXoF33')
      .then(res => res.json())
      .then(res => {
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
