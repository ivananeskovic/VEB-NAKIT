import React, { useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { toggleFavorite } from '../slices/favoriteSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { favoriteItems } = useSelector((state) => state.favorites);
  const categories = ['Sve', 'Mindjuse', 'Ogrlice', 'Narukvice', 'Setovi'];
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const filteredProducts =
    selectedCategory === 'Sve'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <section className="hero-section">
        <div>
          <p className="eyebrow">Online prodaja nakita</p>
          <h1>Jewelry Shop</h1>
          <p>
            Pregledajte mindjuse, ogrlice, narukvice i poklon setove na jednom
            mestu.
          </p>
        </div>
      </section>

      <section className="intro-section">
        <div>
          <p className="eyebrow">Kolekcija</p>
          <h2>Nakit za svakodnevne i posebne trenutke</h2>
          <p>
            Kolekcija je podeljena na mindjuse, ogrlice, narukvice i elegantne
            poklon setove.
          </p>
        </div>
        <div className="category-preview">
          {categories.map((category) => (
            <Button
              className={selectedCategory === category ? 'active' : ''}
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <div className="screen-heading">
          <p className="eyebrow">Katalog</p>
          <h2>{selectedCategory === 'Sve' ? 'Najnoviji proizvodi' : selectedCategory}</h2>
        </div>
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product
                product={product}
                isFavorite={favoriteItems.some((item) => item._id === product._id)}
                onToggleFavorite={(item) => dispatch(toggleFavorite(item))}
              />
            </Col>
          ))}
        </Row>
      </section>

      <section className="favorites-section" id="favorites">
        <div className="screen-heading">
          <p className="eyebrow">Korisnik</p>
          <h2>Omiljeni proizvodi</h2>
        </div>
        {favoriteItems.length === 0 ? (
          <p className="empty-state">Niste dodali nijedan proizvod u favorite.</p>
        ) : (
          <ListGroup className="favorite-list" as="ul" variant="flush">
            {favoriteItems.map((product) => (
              <ListGroup.Item as="li" key={product._id}>
                <span>{product.name}</span>
                <strong>{product.price.toLocaleString('sr-RS')} RSD</strong>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
