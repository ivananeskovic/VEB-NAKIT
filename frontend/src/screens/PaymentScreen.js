import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { savePaymentMethod as savePaymentMethodAction } from '../slices/cartSlice';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentMethod } = useSelector((state) => state.cart);
  const [method, setMethod] = useState(paymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethodAction(method));
    toast.success('Nacin placanja je sacuvan.');
    navigate('/placeorder');
  };
  const paymentOptions = ['Pouzecem', 'Karticom'];

  return (
    <section className="form-screen">
      <h2>Placanje</h2>
      <Form onSubmit={submitHandler}>
        {paymentOptions.map((option) => (
          <Form.Check
            checked={method === option}
            className="mb-2"
            id={option}
            key={option}
            label={option === 'Pouzecem' ? 'Placanje pouzecem' : 'Platna kartica'}
            name="paymentMethod"
            onChange={(e) => setMethod(e.target.value)}
            type="radio"
            value={option}
          />
        ))}

        <Button className="primary-button mt-2" type="submit">
          Nastavi
        </Button>
      </Form>
    </section>
  );
};

export default PaymentScreen;
