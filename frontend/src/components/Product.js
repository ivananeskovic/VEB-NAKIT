import React from 'react';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <h3>{product.name}</h3>
        <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
        <p>{product.description}</p>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price.toLocaleString('sr-RS')} RSD</p>
      </div>
    </article>
  );
};

export default Product;
