import React from 'react';
import { Button, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeFromCart } from '../slices/cartSlice';
import { calculateCartPrices } from '../utils/cartUtils';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { itemsPrice } = calculateCartPrices(cartItems);
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info('Proizvod je uklonjen iz korpe.');
  };

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
          <ListGroup className="cart-list" as="ul" variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item as="li" key={item._id}>
                <Image src={item.image} alt={item.name} rounded />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.qty} x {item.price.toLocaleString('sr-RS')} RSD
                  </p>
                </div>
                <strong>{(item.price * item.qty).toLocaleString('sr-RS')} RSD</strong>
                <Button type="button" onClick={() => removeFromCartHandler(item._id)}>
                  Ukloni
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="cart-total">
            <span>Ukupno</span>
            <strong>{Number(itemsPrice).toLocaleString('sr-RS')} RSD</strong>
          </div>

          <Button
            className="primary-button"
            type="button"
            onClick={() => navigate(userInfo ? '/shipping' : '/login')}
          >
            Nastavi porudzbinu
          </Button>
        </>
      )}
    </section>
  );
};

export default CartScreen;
