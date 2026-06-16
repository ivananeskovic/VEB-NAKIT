import React from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { calculateCartPrices } from '../utils/cartUtils';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, paymentMethod, shippingAddress } = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateCartPrices(cartItems);

  const placeOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        taxPrice,
      }).unwrap();

      dispatch(clearCartItems());
      toast.success('Porudzbina je uspesno kreirana.');
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || 'Porudzbina nije kreirana.');
    }
  };
  const summaryItems = [
    ['Proizvodi', itemsPrice],
    ['Dostava', shippingPrice],
    ['PDV', taxPrice],
    ['Ukupno', totalPrice],
  ];

  return (
    <Row className="place-order g-4">
      <Col md={8} className="order-main">
        <Card className="panel-section">
          <Card.Body>
            <h2>Dostava</h2>
            <p>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </p>
          </Card.Body>
        </Card>

        <Card className="panel-section">
          <Card.Body>
            <h2>Placanje</h2>
            <p>{paymentMethod}</p>
          </Card.Body>
        </Card>

        <Card className="panel-section">
          <Card.Body>
            <h2>Proizvodi</h2>
            <ListGroup className="cart-list order-items" as="ul" variant="flush">
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
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="order-summary sticky-summary">
          <Card.Body>
            <h2>Pregled porudzbine</h2>
            {summaryItems.map(([label, value]) => (
              <div
                className={label === 'Ukupno' ? 'summary-row summary-total' : 'summary-row'}
                key={label}
              >
                <span>{label}</span>
                <strong>{Number(value).toLocaleString('sr-RS')} RSD</strong>
              </div>
            ))}
            <Button
              className="primary-button order-button"
              disabled={cartItems.length === 0 || isLoading}
              type="button"
              onClick={placeOrder}
            >
              {isLoading ? 'Kreiranje...' : 'Potvrdi porudzbinu'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
