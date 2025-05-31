import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a separate NavBar component to access Redux state
const NavBarWithCartCount = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart
            {cartItemCount > 0 && (
              <Badge pill bg="danger" className="ms-1">
                {cartItemCount}
              </Badge>
            )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBarWithCartCount />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;