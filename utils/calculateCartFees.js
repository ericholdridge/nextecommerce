export const calculateSubtotal = (cart) => {
  const subtotal = cart?.map((item) => item.totalPrice);
  const total = subtotal?.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  return "$" + total.toFixed(2);
};

export const calculateShippingTotal = (cart) => {
  const itemPrices = cart?.map((item) => item.totalWeight);
  const shippingTotal = itemPrices?.reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + currentValue;
  },
  0);
  return "$" + shippingTotal.toFixed(2);
};

export const calculateCartTotal = (cart) => {
  const itemPrices = cart?.map((item) => item.totalPrice + item.totalWeight);
  const total = itemPrices?.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  return "$" + total.toFixed(2);
};
