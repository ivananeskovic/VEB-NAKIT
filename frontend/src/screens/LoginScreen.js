import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../slices/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ email }));
      toast.success('Uspesno ste se prijavili.');
      navigate('/');
    } else {
      toast.error('Unesite email i lozinku.');
    }
  };

  return (
    <section className="form-screen">
      <h2>Prijava</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email adresa</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>

        <Button className="primary-button" type="submit">
          Prijavi se
        </Button>
      </Form>
      <p>
        Nemate nalog? <Link to="/register">Registrujte se</Link>
      </p>
    </section>
  );
};

export default LoginScreen;
