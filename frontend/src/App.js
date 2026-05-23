import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

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
                U ponudi ce biti mindjuse, ogrlice, narukvice i poklon setovi.
                Katalog proizvoda bice dodat u sledecem koraku.
              </p>
            </div>
            <div className="category-preview">
              <span>Mindjuse</span>
              <span>Ogrlice</span>
              <span>Narukvice</span>
              <span>Setovi</span>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
