import React from 'react';
import Rating from '../components/Rating';

const ProductScreen = ({ product, isFavorite, onToggleFavorite, onAddToCart }) => {
  return (
    <>
      <a className="back-link" href="/">
        Nazad
      </a>
      <section className="product-details">
        <img src={product.image} alt={product.name} />
        <div>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
          <p>{product.description}</p>
          <p>
            <strong>Cena:</strong> {product.price.toLocaleString('sr-RS')} RSD
          </p>
          <p>
            <strong>Status:</strong>{' '}
            {product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}
          </p>
          <div className="detail-actions">
            <button
              className={isFavorite ? 'secondary-button active' : 'secondary-button'}
              type="button"
              onClick={() => onToggleFavorite(product)}
            >
              {isFavorite ? 'U favoritima' : 'Dodaj u favorite'}
            </button>
            <button
              className="primary-button"
              type="button"
              onClick={() => onAddToCart(product)}
              disabled={product.countInStock === 0}
            >
              Dodaj u korpu
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductScreen;
