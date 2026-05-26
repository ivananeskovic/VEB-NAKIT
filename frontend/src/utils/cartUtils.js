export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const calculateCartPrices = (cartItems) => {
  const itemsPrice = addDecimal(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimal(Number(itemsPrice) > 10000 ? 0 : 500);
  const taxPrice = addDecimal(Number(itemsPrice) * 0.2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const updateCart = (state) => {
  const prices = calculateCartPrices(state.cartItems);

  state.itemsPrice = prices.itemsPrice;
  state.shippingPrice = prices.shippingPrice;
  state.taxPrice = prices.taxPrice;
  state.totalPrice = prices.totalPrice;

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};
