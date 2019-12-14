export const removeStock = symbol => {
  return {
    type: 'REMOVE_STOCK',
    symbol: symbol
  };
};

export const addStock = (symbol, quantity) => {
  return {
    type: 'ADD_STOCK',
    symbol: symbol,
    quantity: quantity
  };
};

export const addModal = () => {
  return {
    type: 'ADD_MODAL'
  };
};

export const removeModal = () => {
  return {
    type: 'REMOVE_MODAL'
  };
};

export const changeStockQuantity = quantity => {
  return {
    type: 'STOCK_QUANTITY',
    quantity: quantity
  };
};
