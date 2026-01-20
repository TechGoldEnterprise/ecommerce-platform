import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [inWishlist, setInWishlist] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const wishlist = JSON.parse(localStorage.getItem(`nexus_wishlist_${user.id}`) || '[]');
      const isInWishlist = wishlist.some(item => item._id === product._id);
      setInWishlist(isInWishlist);
    }
  }, [isAuthenticated, user?.id, product._id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    }));
    toast.success('Added to cart!');
  };

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem(`nexus_wishlist_${user.id}`) || '[]');
    
    if (inWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item._id !== product._id);
      localStorage.setItem(`nexus_wishlist_${user.id}`, JSON.stringify(updatedWishlist));
      setInWishlist(false);
      toast.success('Removed from wishlist');
    } else {
      // Add to wishlist
      const productToAdd = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        images: product.images,
        rating: product.rating,
        featured: product.featured,
        colors: product.colors
      };
      
      wishlist.push(productToAdd);
      localStorage.setItem(`nexus_wishlist_${user.id}`, JSON.stringify(wishlist));
      setInWishlist(true);
      toast.success('Added to wishlist! ❤️');
    }
  };

  // Fallback image if the URL fails
  const getProductImage = () => {
    if (product.images && product.images[0]) {
      return product.images[0];
    }
    
    // Color-based fallback images
    const colorFallbacks = {
      '#3a86ff': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      '#7209b7': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      '#4cc9f0': 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      '#4361ee': 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
      '#560bad': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      '#3a0ca3': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    };
    
    return colorFallbacks[product.colors?.[0]] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop';
  };

  const productImage = getProductImage();

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img 
            src={productImage}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop';
            }}
          />
        </Link>
        
        {/* Wishlist Button */}
        <button 
          onClick={toggleWishlist}
          className="wishlist-btn"
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            background: 'white',
            color: inWishlist ? '#e63946' : '#666',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
            zIndex: 1,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 5px 12px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 3px 8px rgba(0,0,0,0.15)';
          }}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <i className={`fas fa-heart ${inWishlist ? 'fas' : 'far'}`}></i>
        </button>
        
        {/* Stock Status */}
        {product.stock === 0 && (
          <span className="out-of-stock">Out of Stock</span>
        )}
        
        {/* Featured Badge */}
        {product.featured && (
          <span className="featured-badge" style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'linear-gradient(135deg, #ff9e00, #ff6b6b)',
            color: 'white',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            boxShadow: '0 3px 6px rgba(255, 158, 0, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Featured
          </span>
        )}
        
        {/* Quick View Overlay */}
        <div className="quick-view-overlay" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.8rem',
          transform: 'translateY(100%)',
          transition: 'transform 0.3s ease',
          textAlign: 'center'
        }}>
          <Link 
            to={`/product/${product._id}`}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <i className="fas fa-eye"></i>
            Quick View
          </Link>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="product-description">
          {product.description.substring(0, 80)}...
        </p>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                style={{ 
                  color: i < Math.floor(product.rating) ? '#ffd700' : '#ddd',
                  fontSize: '0.9rem'
                }}
              />
            ))}
            <span style={{ 
              color: '#666', 
              fontSize: '0.85rem',
              marginLeft: '0.3rem'
            }}>
              ({product.reviews?.length || 0})
            </span>
          </div>
        </div>
        
        <div className="product-meta" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.8rem',
          paddingTop: '0.8rem',
          borderTop: '1px solid #eee',
          fontSize: '0.85rem',
          color: '#666'
        }}>
          <span style={{
            background: product.stock > 10 ? 'rgba(56, 176, 0, 0.1)' : 
                       product.stock > 0 ? 'rgba(255, 158, 0, 0.1)' : 'rgba(230, 57, 70, 0.1)',
            color: product.stock > 10 ? '#38b000' : 
                   product.stock > 0 ? '#ff9e00' : '#e63946',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            {product.stock > 10 ? 'In Stock' : 
             product.stock > 0 ? `Low Stock (${product.stock})` : 'Out of Stock'}
          </span>
          <span style={{
            background: '#f0f0f0',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px'
          }}>
            {product.category}
          </span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="add-to-cart-btn"
          style={{
            marginTop: '1rem',
            position: 'relative',
            overflow: 'hidden'
          }}
          title={!isAuthenticated ? "Login to add to cart" : product.stock === 0 ? "Out of stock" : "Add to cart"}
        >
          <i className="fas fa-shopping-cart"></i>
          {!isAuthenticated ? "Login to Buy" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          {product.stock > 0 && isAuthenticated && (
            <span style={{
              position: 'absolute',
              right: '1rem',
              fontSize: '0.8rem',
              opacity: '0.8'
            }}>
              +
            </span>
          )}
        </button>
      </div>
      
      {/* Hover Effects */}
      <style>{`
        .product-card:hover .quick-view-overlay {
          transform: translateY(0);
        }
        
        .product-card:hover .add-to-cart-btn {
          background: linear-gradient(135deg, #2a76ff, #6209a7);
        }
        
        .wishlist-btn:hover {
          color: #e63946 !important;
          background: #fff0f0 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;