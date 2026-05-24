import React from 'react';
import Product from '../components/Product';

const HomeScreen = ({ products, favoriteItems, onToggleFavorite }) => {
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
          <span>Mindjuse</span>
          <span>Ogrlice</span>
          <span>Narukvice</span>
          <span>Setovi</span>
        </div>
      </section>

      <section className="catalog-section">
        <div className="screen-heading">
          <p className="eyebrow">Katalog</p>
          <h2>Najnoviji proizvodi</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              isFavorite={favoriteItems.some((item) => item._id === product._id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      <section className="favorites-section" id="favorites">
        <div className="screen-heading">
          <p className="eyebrow">Korisnik</p>
          <h2>Omiljeni proizvodi</h2>
        </div>
        {favoriteItems.length === 0 ? (
          <p className="empty-state">Niste dodali nijedan proizvod u favorite.</p>
        ) : (
          <ul className="favorite-list">
            {favoriteItems.map((product) => (
              <li key={product._id}>
                <span>{product.name}</span>
                <strong>{product.price.toLocaleString('sr-RS')} RSD</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
