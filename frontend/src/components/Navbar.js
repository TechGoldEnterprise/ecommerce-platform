import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <i className="fas fa-store" style={{ marginRight: '8px' }}></i>
        NexusShop
      </Link>
      <div className="nav-links">
        {/* Show different links based on auth status */}
        {isAuthenticated ? (
          <>
            {/* Logged in: Show Shop and Cart */}
            <Link to="/products" className="nav-link">
              <i className="fas fa-store"></i> Shop
            </Link>
            <Link to="/cart" className="nav-link cart-icon">
              <i className="fas fa-shopping-cart"></i> Cart
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>
          </>
        ) : (
          <>
            {/* Not logged in: Show Home and Login */}
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> Home
            </Link>
            <Link to="/login" className="nav-link">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          </>
        )}
        
        {/* User dropdown or register link */}
        {isAuthenticated ? (
          <div 
            ref={dropdownRef}
            style={{ 
              position: 'relative', 
              display: 'inline-block' 
            }}
          >
            <button
              onClick={toggleDropdown}
              className="nav-link"
              style={{
                background: dropdownOpen ? 'rgba(255,255,255,0.2)' : 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onMouseOver={(e) => !dropdownOpen && (e.target.style.background = 'rgba(255,255,255,0.1)')}
              onMouseOut={(e) => !dropdownOpen && (e.target.style.background = 'none')}
            >
              <i className="fas fa-user-circle"></i>
              {user?.name?.split(' ')[0] || 'Account'}
              <i 
                className={`fas fa-chevron-down`} 
                style={{ 
                  fontSize: '0.8rem',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              ></i>
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  minWidth: '220px',
                  zIndex: 1000,
                  overflow: 'hidden',
                  border: '1px solid rgba(58, 134, 255, 0.1)',
                  animation: 'fadeIn 0.2s ease'
                }}
              >
                <div style={{ padding: '0.5rem 0' }}>
                  {/* User Info */}
                  <div style={{
                    padding: '1rem 1.2rem',
                    borderBottom: '1px solid #f0f0f0',
                    background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.05), rgba(114, 9, 183, 0.05))'
                  }}>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#666',
                      marginBottom: '0.3rem'
                    }}>
                      Signed in as
                    </div>
                    <div style={{ 
                      fontWeight: '600',
                      color: '#333',
                      fontSize: '1rem'
                    }}>
                      {user?.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#3a86ff',
                      marginTop: '0.2rem'
                    }}>
                      {user?.email}
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <Link 
                    to="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.9rem 1.2rem',
                      color: '#333',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      borderBottom: '1px solid #f5f5f5'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#f8f9fa';
                      e.target.style.paddingLeft = '1.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.paddingLeft = '1.2rem';
                    }}
                  >
                    <i className="fas fa-user" style={{ 
                      width: '20px', 
                      textAlign: 'center',
                      color: '#3a86ff'
                    }}></i>
                    My Profile
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.9rem 1.2rem',
                      color: '#333',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      borderBottom: '1px solid #f5f5f5'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#f8f9fa';
                      e.target.style.paddingLeft = '1.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.paddingLeft = '1.2rem';
                    }}
                  >
                    <i className="fas fa-shopping-bag" style={{ 
                      width: '20px', 
                      textAlign: 'center',
                      color: '#7209b7'
                    }}></i>
                    My Orders
                  </Link>
                  
                  <Link 
                    to="/wishlist" 
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.9rem 1.2rem',
                      color: '#333',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      borderBottom: '1px solid #f5f5f5'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#f8f9fa';
                      e.target.style.paddingLeft = '1.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.paddingLeft = '1.2rem';
                    }}
                  >
                    <i className="fas fa-heart" style={{ 
                      width: '20px', 
                      textAlign: 'center',
                      color: '#e63946'
                    }}></i>
                    Wishlist
                  </Link>
                  
                  <Link 
                    to="/settings" 
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.9rem 1.2rem',
                      color: '#333',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      borderBottom: '1px solid #f5f5f5'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#f8f9fa';
                      e.target.style.paddingLeft = '1.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.paddingLeft = '1.2rem';
                    }}
                  >
                    <i className="fas fa-cog" style={{ 
                      width: '20px', 
                      textAlign: 'center',
                      color: '#666'
                    }}></i>
                    Settings
                  </Link>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.9rem 1.2rem',
                      background: 'none',
                      border: 'none',
                      color: '#e63946',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      borderTop: '1px solid #f5f5f5',
                      marginTop: '0.5rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#ffeaea';
                      e.target.style.paddingLeft = '1.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.paddingLeft = '1.2rem';
                    }}
                  >
                    <i className="fas fa-sign-out-alt" style={{ 
                      width: '20px', 
                      textAlign: 'center'
                    }}></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register" className="nav-link">
            <i className="fas fa-user-plus"></i> Register
          </Link>
        )}
      </div>

      {/* Add animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;