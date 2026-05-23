import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
          <h1>Jewelry Shop</h1>
          <p>Dobrodosli u online prodavnicu nakita.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
