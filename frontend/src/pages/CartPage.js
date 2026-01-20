import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 0 ? 5.99 : 0;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: (subtotal + tax + shipping).toFixed(2)
    };
  };

  const totals = calculateTotal();

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id));
    toast.error(`Removed ${name} from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared');
  };

  // Fix for broken images - use fallback
  const getProductImage = (item) => {
    if (item.image && !item.image.includes('undefined')) {
      return item.image;
    }
    
    // Fallback images based on product name
    const fallbackImages = {
      'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      'earbuds': 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop',
      'watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      'keyboard': 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop',
      'backpack': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      'phone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop'
    };
    
    // Find matching fallback
    const name = item.name.toLowerCase();
    for (const [key, url] of Object.entries(fallbackImages)) {
      if (name.includes(key)) {
        return url;
      }
    }
    
    // Default fallback
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop';
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart" style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.05), rgba(114, 9, 183, 0.05))',
        borderRadius: '15px',
        margin: '2rem'
      }}>
        <i className="fas fa-shopping-cart" style={{
          fontSize: '4rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem'
        }}></i>
        <h2 style={{
          fontSize: '2rem',
          color: '#333',
          marginBottom: '1rem'
        }}>Your cart is empty</h2>
        <p style={{
          color: '#666',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="btn btn-primary" style={{
          padding: '1rem 2.5rem',
          fontSize: '1.1rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ padding: '2rem' }}>
      <h1 style={{
        fontSize: '2.5rem',
        background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1.5rem',
        fontWeight: 'bold'
      }}>
        <i className="fas fa-shopping-cart" style={{ marginRight: '15px' }}></i>
        Shopping Cart
      </h1>
      
      <div className="cart-container" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginTop: '1rem'
      }}>
        {/* Cart Items */}
        <div className="cart-items">
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              marginBottom: '1.5rem',
              color: '#333',
              fontSize: '1.3rem',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '0.8rem'
            }}>
              {cartItems.length} Item{cartItems.length !== 1 ? 's' : ''} in Cart
            </h3>
            
            {cartItems.map(item => {
              const productImage = getProductImage(item);
              
              return (
                <div key={item.id} className="cart-item" style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto auto',
                  gap: '1.5rem',
                  alignItems: 'center',
                  padding: '1.5rem',
                  background: '#f9f9f9',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  border: '1px solid #eee'
                }}>
                  <img 
                    src={productImage}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop';
                    }}
                  />
                  
                  <div className="cart-item-details">
                    <h4 style={{
                      margin: '0 0 0.5rem 0',
                      color: '#333',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>{item.name}</h4>
                    <p style={{
                      margin: '0 0 0.5rem 0',
                      color: '#3a86ff',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="cart-item-quantity" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}>
                    <button 
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1
                          }));
                        }
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #ddd',
                        background: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#f0f0f0';
                        e.target.style.borderColor = '#3a86ff';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#ddd';
                      }}
                    >-</button>
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>{item.quantity || 1}</span>
                    <button 
                      onClick={() => {
                        dispatch(updateQuantity({
                          id: item.id,
                          quantity: (item.quantity || 1) + 1
                        }));
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #ddd',
                        background: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#f0f0f0';
                        e.target.style.borderColor = '#3a86ff';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#ddd';
                      }}
                    >+</button>
                  </div>
                  
                  <div className="cart-item-total" style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: '#7209b7',
                    minWidth: '100px',
                    textAlign: 'right'
                  }}>
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="remove-btn"
                    style={{
                      background: 'linear-gradient(135deg, #e63946, #ff6b6b)',
                      color: 'white',
                      border: 'none',
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 3px 8px rgba(230, 57, 70, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.1) rotate(5deg)';
                      e.target.style.boxShadow = '0 5px 15px rgba(230, 57, 70, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1) rotate(0deg)';
                      e.target.style.boxShadow = '0 3px 8px rgba(230, 57, 70, 0.3)';
                    }}
                    title="Remove item"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              );
            })}
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '2px solid #f0f0f0'
            }}>
              <button 
                onClick={handleClearCart}
                style={{
                  background: 'linear-gradient(135deg, #ff9e00, #ff6b6b)',
                  color: 'white',
                  border: 'none',
                  padding: '0.9rem 1.8rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 7px 14px rgba(255, 158, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-trash"></i>
                Clear Entire Cart
              </button>
              
              <Link to="/" style={{
                background: 'white',
                color: '#3a86ff',
                border: '2px solid #3a86ff',
                padding: '0.9rem 1.8rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#3a86ff';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 7px 14px rgba(58, 134, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#3a86ff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                <i className="fas fa-plus"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="cart-summary">
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.8rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              marginBottom: '1.5rem',
              color: '#333',
              fontSize: '1.4rem',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '0.8rem',
              fontWeight: '600'
            }}>
              <i className="fas fa-receipt" style={{ marginRight: '10px' }}></i>
              Order Summary
            </h3>
            
            <div className="summary-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.8rem 0',
              borderBottom: '1px solid #eee'
            }}>
              <span style={{ color: '#666' }}>Subtotal</span>
              <span style={{ fontWeight: '500' }}>${totals.subtotal}</span>
            </div>
            
            <div className="summary-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.8rem 0',
              borderBottom: '1px solid #eee'
            }}>
              <span style={{ color: '#666' }}>Shipping</span>
              <span style={{ fontWeight: '500' }}>${totals.shipping}</span>
            </div>
            
            <div className="summary-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.8rem 0',
              borderBottom: '1px solid #eee'
            }}>
              <span style={{ color: '#666' }}>Tax (8%)</span>
              <span style={{ fontWeight: '500' }}>${totals.tax}</span>
            </div>
            
            <div className="summary-row total" style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1.2rem 0',
              borderTop: '2px solid #ddd',
              borderBottom: 'none',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              color: '#333'
            }}>
              <span>Total</span>
              <span style={{
                background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.4rem'
              }}>${totals.total}</span>
            </div>
            
            <button className="btn btn-primary" style={{
              width: '100%',
              padding: '1.2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(58, 134, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              <i className="fas fa-lock"></i>
              Proceed to Checkout
            </button>
            
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #eee',
              fontSize: '0.9rem',
              color: '#666',
              textAlign: 'center'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <i className="fas fa-shield-alt" style={{ marginRight: '8px', color: '#38b000' }}></i>
                Secure checkout
              </p>
              <p>
                <i className="fas fa-credit-card" style={{ marginRight: '8px', color: '#3a86ff' }}></i>
                All major cards accepted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;