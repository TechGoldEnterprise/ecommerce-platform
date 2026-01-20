import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    if (user?.id) {
      const savedWishlist = localStorage.getItem(`nexus_wishlist_${user.id}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    }
  }, [user?.id]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem(`nexus_wishlist_${user.id}`, JSON.stringify(updatedWishlist));
    toast.success('Removed from wishlist');
  };

  const addToCartFromWishlist = (product) => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    }));
    toast.success('Added to cart!');
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(`nexus_wishlist_${user.id}`);
    toast.info('Wishlist cleared');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          <i className="fas fa-heart" style={{ marginRight: '15px' }}></i>
          My Wishlist
        </h1>
        
        {wishlist.length > 0 && (
          <button 
            onClick={clearWishlist}
            style={{
              background: 'white',
              color: '#e63946',
              border: '2px solid #e63946',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <i className="fas fa-trash"></i>
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.05), rgba(114, 9, 183, 0.05))',
          borderRadius: '15px'
        }}>
          <i className="fas fa-heart" style={{
            fontSize: '4rem',
            background: 'linear-gradient(135deg, #e63946, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem'
          }}></i>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Save items you love to your wishlist. Review them anytime and easily move them to your cart.
          </p>
          <Link to="/products" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {wishlist.map(product => (
            <div key={product._id} style={{
              background: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s',
              position: 'relative'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <button 
                onClick={() => removeFromWishlist(product._id)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'white',
                  color: '#e63946',
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  zIndex: 1
                }}
                title="Remove from wishlist"
              >
                <i className="fas fa-times"></i>
              </button>
              
              <Link to={`/product/${product._id}`}>
                <div style={{
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </Link>
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
                  <Link to={`/product/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  {product.description.substring(0, 60)}...
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: '#3a86ff'
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                        style={{ color: i < Math.floor(product.rating) ? '#ffd700' : '#ddd' }}
                      />
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button 
                    onClick={() => addToCartFromWishlist(product)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                      color: 'white',
                      border: 'none',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={() => removeFromWishlist(product._id)}
                    style={{
                      background: 'white',
                      color: '#666',
                      border: '2px solid #ddd',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '50px'
                    }}
                    title="Remove"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;