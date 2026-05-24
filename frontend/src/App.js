import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import products from './utils/productList';

const App = () => {
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const toggleFavorite = (product) => {
    setFavoriteItems((currentItems) => {
      const updatedItems = currentItems.some((item) => item._id === product._id)
        ? currentItems.filter((item) => item._id !== product._id)
        : [...currentItems, product];

      localStorage.setItem('favorites', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const path = window.location.pathname;
  const productId = path.startsWith('/product/') ? path.split('/').pop() : null;
  const selectedProduct = products.find((product) => product._id === productId);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existItem = currentItems.find((item) => item._id === product._id);

      if (existItem) {
        const updatedItems = currentItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );

        localStorage.setItem('cart', JSON.stringify(updatedItems));
        return updatedItems;
      }

      const updatedItems = [...currentItems, { ...product, qty: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <>
      <Header favoriteCount={favoriteItems.length} cartCount={cartItems.length} />
      <main className="py-3">
        <div className="container">
          {path === '/cart' ? (
            <CartScreen cartItems={cartItems} onRemoveFromCart={removeFromCart} />
          ) : selectedProduct ? (
            <ProductScreen
              product={selectedProduct}
              isFavorite={favoriteItems.some((item) => item._id === selectedProduct._id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
            />
          ) : (
            <HomeScreen
              products={products}
              favoriteItems={favoriteItems}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
