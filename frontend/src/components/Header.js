import React from 'react';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="brand" href="/">
          Jewelry Shop
        </a>
        <nav className="main-nav">
          <a href="/">Pocetna</a>
          <a href="/cart">Korpa</a>
          <a href="/login">Prijava</a>
          <a href="/register">Registracija</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
