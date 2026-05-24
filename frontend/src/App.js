import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import products from './utils/productList';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
          <section className="hero-section">
            <div>
              <p className="eyebrow">Online prodaja nakita</p>
              <h1>Jewelry Shop</h1>
              <p>
                Pregledajte mindjuse, ogrlice, narukvice i poklon setove na
                jednom mestu.
              </p>
            </div>
          </section>

          <section className="intro-section">
            <div>
              <p className="eyebrow">Kolekcija</p>
              <h2>Nakit za svakodnevne i posebne trenutke</h2>
              <p>
                Kolekcija je podeljena na mindjuse, ogrlice, narukvice i
                elegantne poklon setove.
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
                <Product key={product._id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
