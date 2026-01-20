import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch from API
  const product = {
    _id: id,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with deep blue LED accents. Features 30-hour battery life, touch controls, and crystal-clear audio quality. Perfect for music lovers and professionals.',
    price: 249.99,
    category: 'Electronics',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop'
    ],
    rating: 4.7,
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Amazing sound quality!', date: '2024-01-15' },
      { user: 'Sarah M.', rating: 4, comment: 'Very comfortable, battery lasts forever.', date: '2024-01-10' },
      { user: 'Mike T.', rating: 5, comment: 'Best headphones I\'ve ever owned!', date: '2024-01-05' }
    ],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.2',
      'Touch controls',
      'Water resistant (IPX4)',
      'Voice assistant support'
    ],
    colors: ['#3a86ff', '#4361ee', '#4cc9f0']
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    }));
    
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="product-detail-page" style={{ padding: '2rem' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: '#3a86ff', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 0.5rem', color: '#666' }}>/</span>
        <Link to="/" style={{ color: '#3a86ff', textDecoration: 'none' }}>Products</Link>
        <span style={{ margin: '0 0.5rem', color: '#666' }}>/</span>
        <span style={{ color: '#666' }}>{product.name}</span>
      </div>

      <div className="product-detail-container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Product Images */}
        <div className="product-images">
          <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '15px',
            overflow: 'hidden',
            marginBottom: '1rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: selectedImage === index ? '3px solid #3a86ff' : '2px solid #e0e0e0',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="product-info">
          <h1 style={{
            fontSize: '2.5rem',
            color: '#1a1a2e',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>{product.name}</h1>
          
          <div className="product-rating" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
              color: 'white',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              ⭐ {product.rating}
            </div>
            <span style={{ color: '#666' }}>
              ({product.reviews.length} reviews)
            </span>
          </div>
          
          <p style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem'
          }}>
            ${product.price.toFixed(2)}
          </p>
          
          <div className="product-stock" style={{ marginBottom: '1.5rem' }}>
            {product.stock > 0 ? (
              <span style={{
                color: '#38b000',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <i className="fas fa-check-circle"></i>
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span style={{ color: '#e63946', fontWeight: '600' }}>
                Out of Stock
              </span>
            )}
          </div>
          
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#555',
            marginBottom: '2rem'
          }}>{product.description}</p>
          
          {/* Features */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>Key Features:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {product.features.map((feature, index) => (
                <li key={index} style={{
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="fas fa-check" style={{ color: '#38b000' }}></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Colors */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>Available Colors:</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: color,
                    border: '2px solid white',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    cursor: 'pointer'
                  }}
                  title={`Color ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Product Actions */}
          <div className="product-actions">
            <div className="quantity-selector" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontWeight: '500', color: '#333' }}>Quantity:</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: '#f5f5f5',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid #ddd',
                    background: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333'
                  }}
                >-</button>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  minWidth: '40px',
                  textAlign: 'center'
                }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid #ddd',
                    background: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333'
                  }}
                >+</button>
              </div>
            </div>
            
            <div className="action-buttons" style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button 
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  padding: '1.2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem'
                }}
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  padding: '1.2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #7209b7, #3a0ca3)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem'
                }}
              >
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
            </div>
          </div>
          
          {/* Product Meta */}
          <div className="product-meta" style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #eee',
            color: '#666'
          }}>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>SKU:</strong> {product._id}</p>
            <p><strong>Free Shipping:</strong> Yes</p>
            <p><strong>30-Day Returns:</strong> Yes</p>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="product-reviews" style={{
        marginTop: '3rem',
        paddingTop: '3rem',
        borderTop: '1px solid #eee'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>Customer Reviews</h2>
        
        {product.reviews.length > 0 ? (
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {product.reviews.map((review, index) => (
              <div key={index} className="review" style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div className="review-rating" style={{ marginBottom: '0.5rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i}
                          className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}
                          style={{ 
                            color: i < review.rating ? '#ffd700' : '#ddd',
                            marginRight: '0.2rem'
                          }}
                        />
                      ))}
                    </div>
                    <strong style={{ color: '#333' }}>{review.user}</strong>
                  </div>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p style={{
                  color: '#555',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  margin: 0
                }}>"{review.comment}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ 
            textAlign: 'center', 
            color: '#666',
            padding: '2rem',
            background: 'rgba(58, 134, 255, 0.05)',
            borderRadius: '10px'
          }}>
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>

      {/* Related Products Section */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>You May Also Like</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {/* Add related products here */}
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'rgba(58, 134, 255, 0.05)',
            borderRadius: '10px',
            color: '#666'
          }}>
            <p>Related products will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;