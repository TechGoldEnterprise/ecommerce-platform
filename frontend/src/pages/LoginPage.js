import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('nexusUsers') || '[]');
      const user = users.find(user => 
        user.email === data.email && user.password === data.password
      );
      
      if (!user) {
        toast.error('Invalid email or password');
        setLoading(false);
        return;
      }
      
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = user;
      
      // Dispatch login action (we'll create this slice next)
      dispatch(login(userWithoutPassword));
      
      // Store in localStorage
      localStorage.setItem('nexusCurrentUser', JSON.stringify(userWithoutPassword));
      
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid rgba(58, 134, 255, 0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            fontSize: '1.5rem'
          }}>
            <i className="fas fa-sign-in-alt"></i>
          </div>
          <h2 style={{
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>Welcome Back</h2>
          <p style={{ color: '#666' }}>Sign in to your NexusShop account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Email Address</label>
            <input
              type="email"
              {...register("email", { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                border: `2px solid ${errors.email ? '#e63946' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              placeholder="Enter your email"
              defaultValue="customer@example.com"
            />
            {errors.email && (
              <p style={{ color: '#e63946', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Password</label>
            <input
              type="password"
              {...register("password", { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                border: `2px solid ${errors.password ? '#e63946' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              placeholder="Enter your password"
              defaultValue="password123"
            />
            {errors.password && (
              <p style={{ color: '#e63946', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              color: '#555'
            }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} />
              <span>Remember me</span>
            </label>
            
            <Link to="/forgot-password" style={{
              color: '#3a86ff',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid white',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>

          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #eee',
            color: '#666'
          }}>
            <p>
              Don't have an account?{' '}
              <Link to="/register" style={{
                color: '#3a86ff',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Create Account
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(58, 134, 255, 0.05)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#555'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
              <i className="fas fa-info-circle" style={{ marginRight: '5px' }}></i>
              Demo Credentials:
            </p>
            <p style={{ margin: '0' }}>
              <strong>Email:</strong> customer@example.com<br />
              <strong>Password:</strong> password123
            </p>
          </div>
        </form>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          input:focus {
            border-color: #3a86ff !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoginPage;