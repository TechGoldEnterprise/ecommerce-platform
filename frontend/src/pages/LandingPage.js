import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
        color: 'white',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(114, 9, 183, 0.2)',
          borderRadius: '50%'
        }}></div>
        <h1 style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>Welcome to NexusShop</h1>
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '2.5rem',
          maxWidth: '800px',
          margin: '0 auto 2.5rem',
          opacity: '0.9'
        }}>
          Your premier destination for premium electronics, fashion, and lifestyle products.
          Experience shopping redefined with our blue-purple themed excellence.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {!isAuthenticated ? (
            <Link to="/register" style={{
              background: 'white',
              color: '#3a86ff',
              padding: '1.2rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}>
              Get Started Free
            </Link>
          ) : (
            <button
              onClick={() => navigate('/products')}
              style={{
                background: 'white',
                color: '#3a86ff',
                padding: '1.2rem 2.5rem',
                borderRadius: '50px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }}
            >
              Go to Shop
            </button>
          )}
          <Link to="/login" style={{
            background: 'transparent',
            color: 'white',
            border: '2px solid white',
            padding: '1.2rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#3a86ff';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'white';
          }}>
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 2rem', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.8rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>Why Choose NexusShop?</h2>
          {/* ... keep existing features section unchanged ... */}
        </div>
      </section>

      {/* Product Preview Section */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.8rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>Featured Products</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{
                background: '#f8f9fa',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${item === 1 ? '#3a86ff' : item === 2 ? '#7209b7' : '#4cc9f0'}20, ${item === 1 ? '#3a86ff' : item === 2 ? '#7209b7' : '#4cc9f0'}40)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    background: `linear-gradient(135deg, ${item === 1 ? '#3a86ff' : item === 2 ? '#7209b7' : '#4cc9f0'}, ${item === 1 ? '#4361ee' : item === 2 ? '#3a0ca3' : '#4361ee'})`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem'
                  }}>
                    {item === 1 ? '🎧' : item === 2 ? '⌚' : '💻'}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
                    {item === 1 ? 'Premium Headphones' : item === 2 ? 'Smart Watch' : 'Laptop'}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem' }}>
                    {item === 1 ? 'Noise-cancelling wireless headphones' :
                      item === 2 ? 'Fitness tracker with heart monitor' :
                        'High-performance laptop for work & play'}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: item === 1 ? '#3a86ff' : item === 2 ? '#7209b7' : '#4cc9f0'
                    }}>
                      ${item === 1 ? '249.99' : item === 2 ? '299.99' : '899.99'}
                    </span>
                    <span style={{
                      background: '#38b000',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleViewAllProducts}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                color: 'white',
                padding: '1.2rem 3rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 10px 25px rgba(58, 134, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.05), rgba(114, 9, 183, 0.05))' }}>
        {/* ... keep testimonials unchanged ... */}
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '3rem',
          marginBottom: '1.5rem',
          fontWeight: 'bold'
        }}>Ready to Shop?</h2>
        <p style={{
          fontSize: '1.3rem',
          marginBottom: '2.5rem',
          maxWidth: '700px',
          margin: '0 auto 2.5rem',
          opacity: '0.9'
        }}>
          Join thousands of satisfied customers. Create your account now and start shopping!
        </p>
        {!isAuthenticated ? (
          <Link to="/register" style={{
            background: 'white',
            color: '#3a86ff',
            padding: '1.2rem 3rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            display: 'inline-block',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            Get Started Free
          </Link>
        ) : (
          <button
            onClick={() => navigate('/products')}
            style={{
              background: 'white',
              color: '#3a86ff',
              padding: '1.2rem 3rem',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Go to Shop
          </button>
        )}
      </section>
    </div>
  );
};

export default LandingPage;