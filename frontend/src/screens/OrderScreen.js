import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Alert, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/orderApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const { data: paypal, isLoading: loadingPayPal } = useGetPaypalClientIdQuery();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    });

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    await payOrder({ orderId, details }).unwrap();
    refetch();
    toast.success('Placanje je uspesno.');
  };

  const onError = (err) => {
    toast.error(err?.message || 'PayPal placanje nije uspelo.');
  };

  if (isLoading) {
    return <p className="empty-state">Ucitavanje porudzbine...</p>;
  }

  if (error) {
    return <p className="empty-state">Porudzbina nije dostupna.</p>;
  }

  return (
    <Row className="place-order g-4">
      <Col md={8} className="order-main">
        <Card className="panel-section">
          <Card.Body>
            <h2>Porudzbina {order._id}</h2>
            <p>
              <strong>Korisnik:</strong> {order.user?.name} ({order.user?.email})
            </p>
            <p>
              <strong>Dostava:</strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Alert variant="success">Isporuceno {order.deliveredAt}</Alert>
            ) : (
              <Alert variant="warning">Nije isporuceno</Alert>
            )}
          </Card.Body>
        </Card>

        <Card className="panel-section">
          <Card.Body>
            <h2>Placanje</h2>
            <p>
              <strong>Metod:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Alert variant="success">Placeno {order.paidAt}</Alert>
            ) : (
              <Alert variant="warning">Nije placeno</Alert>
            )}
          </Card.Body>
        </Card>

        <Card className="panel-section">
          <Card.Body>
            <h2>Proizvodi</h2>
            <ListGroup className="cart-list order-items" as="ul" variant="flush">
              {order.orderItems.map((item) => (
                <ListGroup.Item as="li" key={item.product}>
                  <Image src={item.image} alt={item.name} rounded />
                  <div>
                    <Link to={`/product/${item.product}`}>
                      <h3>{item.name}</h3>
                    </Link>
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
            <div className="summary-row">
              <span>Proizvodi</span>
              <strong>{Number(order.itemsPrice).toLocaleString('sr-RS')} RSD</strong>
            </div>
            <div className="summary-row">
              <span>Dostava</span>
              <strong>{Number(order.shippingPrice).toLocaleString('sr-RS')} RSD</strong>
            </div>
            <div className="summary-row">
              <span>PDV</span>
              <strong>{Number(order.taxPrice).toLocaleString('sr-RS')} RSD</strong>
            </div>
            <div className="summary-row summary-total">
              <span>Ukupno</span>
              <strong>{Number(order.totalPrice).toLocaleString('sr-RS')} RSD</strong>
            </div>

            {!order.isPaid && order.paymentMethod === 'PayPal' && (
              <>
                {loadingPayPal || loadingPay ? (
                  <p className="empty-state">Ucitavanje placanja...</p>
                ) : !paypal?.clientId ? (
                  <p className="empty-state">PayPal trenutno nije dostupan.</p>
                ) : (
                  <PayPalScriptProvider options={{ clientId: paypal.clientId }}>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </PayPalScriptProvider>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;
