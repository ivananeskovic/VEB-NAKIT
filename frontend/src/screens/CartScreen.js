import React from 'react';

const CartScreen = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="cart-section">
      <div className="screen-heading">
        <p className="eyebrow">Kupovina</p>
        <h2>Korpa</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-state">Korpa je prazna.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.qty} x {item.price.toLocaleString('sr-RS')} RSD
                  </p>
                </div>
                <strong>{(item.price * item.qty).toLocaleString('sr-RS')} RSD</strong>
                <button type="button" onClick={() => onRemoveFromCart(item._id)}>
                  Ukloni
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Ukupno</span>
            <strong>{totalPrice.toLocaleString('sr-RS')} RSD</strong>
          </div>

          <button className="primary-button" type="button">
            Nastavi porudzbinu
          </button>
        </>
      )}
    </section>
  );
};

export default CartScreen;
