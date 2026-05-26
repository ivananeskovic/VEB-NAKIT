import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Rating from './Rating';

const Product = ({ product, isFavorite, onToggleFavorite }) => {
  const toggleFavoriteHandler = () => {
    onToggleFavorite(product);
    toast.info(isFavorite ? 'Proizvod je uklonjen iz favorita.' : 'Proizvod je dodat u favorite.');
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} alt={product.name} variant="top" />
      </Link>
      <Card.Body className="product-body">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h3">{product.name}</Card.Title>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
        <Card.Text>{product.description}</Card.Text>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price.toLocaleString('sr-RS')} RSD</p>
        <Button
          className={isFavorite ? 'secondary-button active' : 'secondary-button'}
          type="button"
          onClick={toggleFavoriteHandler}
        >
          {isFavorite ? 'U favoritima' : 'Dodaj u favorite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
