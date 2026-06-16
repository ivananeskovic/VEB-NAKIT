import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/usersApiSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Uspesno ste se prijavili.');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || 'Prijava nije uspela.');
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

        <Button className="primary-button" disabled={isLoading} type="submit">
          {isLoading ? 'Prijava...' : 'Prijavi se'}
        </Button>
      </Form>
      <p>
        Nemate nalog? <Link to="/register">Registrujte se</Link>
      </p>
    </section>
  );
};

export default LoginScreen;
