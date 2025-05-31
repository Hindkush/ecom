import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice'; // Import the cart action

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  
  console.log('Redux products:', products); // Debug log

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log('Added to cart:', product); // Debug log
  };

  if (loading) return <div>Loading products...</div>;
  if (!products.length) return <div>No products available.</div>;

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <span className="text-danger">${product.discountedPrice}</span>
                <span className="text-muted text-decoration-line-through ms-2">
                  ${product.price}
                </span>
              </Card.Text>
              <Button 
                variant="primary" 
                onClick={() => handleAddToCart(product)} // Add click handler
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;