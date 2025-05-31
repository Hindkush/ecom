import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          address: formData.address,
          phone: formData.phone
        },
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.discountedPrice || item.price
        })),
        total: items.reduce((sum, item) => sum + (item.discountedPrice || item.price) * item.quantity, 0)
      };
      console.log(JSON.stringify(orderData))
      await axios.post('http://localhost:5000/api/orders', orderData);
      
      setSuccess(true);
      dispatch(clearCart());
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="success">
          <h4>Order Placed Successfully!</h4>
          <p>Thank you for your purchase.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="customerName"  // Changed from 'name'
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="customerEmail"  // Changed from 'email'
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CheckoutForm;