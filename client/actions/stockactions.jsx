export const removeStock = id => {
  return {
    type: 'REMOVE_STOCK',
    stockID: id
  };
};
