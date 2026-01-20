import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enhanced mock data with blue-purple theme products
    const mockProducts = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling headphones with deep blue LED accents',
        price: 249.99,
        category: 'Electronics',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=400&fit=crop'],
        rating: 4.7,
        featured: true,
        colors: ['#3a86ff', '#4361ee']
      },
      {
        _id: '2',
        name: 'Smart Fitness Watch',
        description: 'Track your fitness with this gradient blue-purple smartwatch',
        price: 299.99,
        category: 'Electronics',
        stock: 15,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop'],
        rating: 4.5,
        featured: true,
        colors: ['#7209b7', '#560bad']
      },
      {
        _id: '3',
        name: 'Gaming Keyboard RGB',
        description: 'Mechanical keyboard with customizable blue-purple RGB lighting',
        price: 129.99,
        category: 'Electronics',
        stock: 30,
        images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop'],
        rating: 4.8,
        featured: true,
        colors: ['#4cc9f0', '#4361ee']
      },
      {
        _id: '4',
        name: 'Waterproof Backpack',
        description: 'Durable backpack with gradient blue design, perfect for travel',
        price: 89.99,
        category: 'Fashion',
        stock: 40,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop'],
        rating: 4.4,
        featured: true,
        colors: ['#3a86ff', '#4cc9f0']
      },
      {
        _id: '5',
        name: 'Smartphone 256GB',
        description: 'Latest smartphone with vibrant purple finish',
        price: 899.99,
        category: 'Electronics',
        stock: 12,
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop'],
        rating: 4.9,
        featured: true,
        colors: ['#7209b7', '#3a0ca3']
      },
      {
        _id: '6',
        name: 'Noise Cancelling Earbuds',
        description: 'True wireless earbuds with deep blue charging case',
        price: 179.99,
        category: 'Electronics',
        stock: 22,
        images: ['https://images.unsplash.com/photo-1590658165737-15a047b8b5e5?w=600&h=400&fit=crop'],
        rating: 4.6,
        featured: true,
        colors: ['#4361ee', '#4cc9f0']
      }
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="loading" style={{ 
        textAlign: 'center', 
        padding: '100px',
        background: 'linear-gradient(135deg, #3a86ff20, #7209b720)',
        borderRadius: '15px',
        margin: '20px'
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          border: '5px solid #3a86ff',
          borderTop: '5px solid #7209b7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <h2 style={{ 
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Enhanced Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
        color: 'white',
        padding: '5rem 2rem',
        borderRadius: '15px',
        marginBottom: '3rem',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(58, 134, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'rgba(114, 9, 183, 0.2)',
          borderRadius: '50%'
        }}></div>
        
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>Welcome to NexusShop</h1>
        <p style={{ 
          fontSize: '1.3rem', 
          marginBottom: '2rem',
          opacity: '0.9'
        }}>Discover amazing products at great prices</p>
        <button className="btn btn-primary" style={{ 
          marginTop: '1rem',
          padding: '1rem 2.5rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          border: 'none',
          background: 'white',
          color: '#3a86ff',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        }}>
          Shop Now
        </button>
      </div>

      {/* Featured Products Section */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>Featured Products</h2>
          <span style={{
            color: '#666',
            fontSize: '1rem'
          }}>{products.length} products</span>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <i className="fas fa-shipping-fast stat-icon"></i>
          <div className="stat-number">Free</div>
          <div className="stat-label">Shipping</div>
        </div>
        <div className="stat-item">
          <i className="fas fa-shield-alt stat-icon"></i>
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
        <div className="stat-item">
          <i className="fas fa-undo-alt stat-icon"></i>
          <div className="stat-number">30-Day</div>
          <div className="stat-label">Returns</div>
        </div>
        <div className="stat-item">
          <i className="fas fa-award stat-icon"></i>
          <div className="stat-number">100%</div>
          <div className="stat-label">Authentic</div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <h2 style={{
          fontSize: '2rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>Stay Updated</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Subscribe to our newsletter for the latest products and exclusive offers
        </p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories" style={{ marginTop: '3rem' }}>
        <h2 style={{
          fontSize: '2.2rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          marginBottom: '1.5rem'
        }}>Shop by Category</h2>
        <div className="categories-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {[
            { name: 'Electronics', icon: 'fas fa-laptop', color: '#3a86ff' },
            { name: 'Fashion', icon: 'fas fa-tshirt', color: '#7209b7' },
            { name: 'Home', icon: 'fas fa-home', color: '#4cc9f0' },
            { name: 'Sports', icon: 'fas fa-futbol', color: '#4361ee' },
            { name: 'Books', icon: 'fas fa-book', color: '#560bad' },
            { name: 'Beauty', icon: 'fas fa-spa', color: '#3a0ca3' }
          ].map(category => (
            <div key={category.name} className="category-card" style={{
              background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)`,
              padding: '2rem 1.5rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: `2px solid ${category.color}20`
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = `0 10px 20px ${category.color}30`;
              e.target.style.borderColor = category.color;
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
              e.target.style.borderColor = `${category.color}20`;
            }}>
              <i className={category.icon} style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                color: category.color
              }}></i>
              <h3 style={{ 
                color: category.color,
                fontWeight: '600'
              }}>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;