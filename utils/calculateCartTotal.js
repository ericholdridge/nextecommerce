export const calculateCartTotal = (cart) => {
  const itemPrices = cart?.map((item) => item.price);
  const subtotal = itemPrices?.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  return subtotal.toFixed(2);
};
