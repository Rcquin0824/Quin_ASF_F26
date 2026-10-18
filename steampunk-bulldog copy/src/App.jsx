import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';
import SiteNavbar from './components/SiteNavbar.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ReservationsPage from './pages/ReservationsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export const CartContext = createContext(null);

export default function App() {
  const [cart, setCart] = useState([]);
  function addToCart(item, quantity) {
    setCart((currentCart) =>{
      const existing = currentCart.find((entry) => entry.id === item.id);

      if (existing) {
        return currentCart.map((entry) =>
        entry.id === item.id ? {...entry, quantity: Math.min(5, entry.quantity + quantity)}
        : entry
        );
      }
      return [
          ...currentCart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: Math.min(5, Math.max(1, quantity)),
        },
      ];
    });
  }
  function clearCart() {
    setCart([]);
  }

  return (
      <BrowserRouter>
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
          <div className="site-shell">
            <SiteNavbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <footer className="site-footer">
              <Container className="text-center">
                © 2026 Steampunk Bulldog Bento Bar
              </Container>
            </footer>
          </div>
        </CartContext.Provider>
      </BrowserRouter>
  );
}

