import React from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';
import { toggleFavorite } from '../slices/favoriteSlice';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { favoriteItems } = useSelector((state) => state.favorites);
  const { products } = useSelector((state) => state.products);
  const product = products.find((item) => item._id === id);

  if (!product) {
    return <p className="empty-state">Proizvod nije pronadjen.</p>;
  }

  const isFavorite = favoriteItems.some((item) => item._id === product._id);
  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(product));
    toast.info(isFavorite ? 'Proizvod je uklonjen iz favorita.' : 'Proizvod je dodat u favorite.');
  };
  const addToCartHandler = () => {
    dispatch(addToCart(product));
    toast.success('Proizvod je dodat u korpu.');
  };

  return (
    <>
      <Link className="back-link" to="/">
        Nazad
      </Link>
      <Row className="product-details">
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={6}>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Cena:</strong> {product.price.toLocaleString('sr-RS')} RSD
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status:</strong> {product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}
            </ListGroup.Item>
          </ListGroup>
          <div className="detail-actions">
            <Button
              className={isFavorite ? 'secondary-button active' : 'secondary-button'}
              type="button"
              onClick={toggleFavoriteHandler}
            >
              {isFavorite ? 'U favoritima' : 'Dodaj u favorite'}
            </Button>
            <Button
              className="primary-button"
              type="button"
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              Dodaj u korpu
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
