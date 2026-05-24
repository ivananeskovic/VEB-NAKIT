import React from 'react';
import Rating from './Rating';

const Product = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <article className="product-card">
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </a>
      <div className="product-body">
        <a href={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </a>
        <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
        <p>{product.description}</p>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.price.toLocaleString('sr-RS')} RSD</p>
        <button
          className={isFavorite ? 'secondary-button active' : 'secondary-button'}
          type="button"
          onClick={() => onToggleFavorite(product)}
        >
          {isFavorite ? 'U favoritima' : 'Dodaj u favorite'}
        </button>
      </div>
    </article>
  );
};

export default Product;
