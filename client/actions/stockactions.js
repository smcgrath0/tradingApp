export const removeStock = symbol => {
  return {
    type: 'REMOVE_STOCK',
    symbol: symbol
  };
};

export const addStock = symbol => {
  return {
    type: 'ADD_STOCK',
    symbol: symbol
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
