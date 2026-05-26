import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveShippingAddress as saveShippingAddressAction } from '../slices/cartSlice';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'Srbija');
  const fields = [
    { controlId: 'address', label: 'Adresa', value: address, setValue: setAddress },
    { controlId: 'city', label: 'Grad', value: city, setValue: setCity },
    { controlId: 'postalCode', label: 'Postanski broj', value: postalCode, setValue: setPostalCode },
    { controlId: 'country', label: 'Drzava', value: country, setValue: setCountry },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddressAction({ address, city, postalCode, country }));
    toast.success('Adresa za dostavu je sacuvana.');
    navigate('/payment');
  };

  return (
    <section className="form-screen">
      <h2>Dostava</h2>
      <Form onSubmit={submitHandler}>
        {fields.map(({ controlId, label, value, setValue }) => (
          <Form.Group className="mb-3" controlId={controlId} key={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control value={value} onChange={(e) => setValue(e.target.value)} />
          </Form.Group>
        ))}

        <Button className="primary-button" type="submit">
          Nastavi
        </Button>
      </Form>
    </section>
  );
};

export default ShippingScreen;
