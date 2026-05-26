import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../slices/authSlice';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fields = [
    { controlId: 'name', label: 'Ime', type: 'text', value: name, setValue: setName },
    { controlId: 'email', label: 'Email adresa', type: 'email', value: email, setValue: setEmail },
    { controlId: 'password', label: 'Lozinka', type: 'password', value: password, setValue: setPassword },
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    if (name && email && password) {
      dispatch(login({ name, email }));
      toast.success('Uspesno ste se registrovali.');
      navigate('/');
    } else {
      toast.error('Popunite sva polja za registraciju.');
    }
  };

  return (
    <section className="form-screen">
      <h2>Registracija</h2>
      <Form onSubmit={submitHandler}>
        {fields.map(({ controlId, label, type, value, setValue }) => (
          <Form.Group className="mb-3" controlId={controlId} key={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type={type}
            />
          </Form.Group>
        ))}

        <Button className="primary-button" type="submit">
          Registruj se
        </Button>
      </Form>
      <p>
        Vec imate nalog? <Link to="/login">Prijavite se</Link>
      </p>
    </section>
  );
};

export default RegisterScreen;
