import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    if (!items.some(item => item.id === product.id)) {
      dispatch(addToCart(product));
    }
    navigate('/cart');
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Img variant="top" src={product.image} style={{ maxHeight: '500px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <span className="text-danger fs-4">${product.discountedPrice}</span>
            {product.price > product.discountedPrice && (
              <span className="text-muted text-decoration-line-through ms-2">${product.price}</span>
            )}
          </Card.Text>
          <div className="d-flex gap-3">
            <Button variant="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="success" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;