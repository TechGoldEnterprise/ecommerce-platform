import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // In production: axios.post('/api/users/register', data)
      // For now, simulate API call
      console.log('Registering user:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user in localStorage (temporary)
      const users = JSON.parse(localStorage.getItem('nexusUsers') || '[]');
      const userExists = users.find(user => user.email === data.email);
      
      if (userExists) {
        toast.error('Email already registered!');
        setLoading(false);
        return;
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...data,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('nexusUsers', JSON.stringify(users));
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
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
            <i className="fas fa-user-plus"></i>
          </div>
          <h2 style={{
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>Create Account</h2>
          <p style={{ color: '#666' }}>Join NexusShop for the best shopping experience</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Full Name</label>
            <input
              type="text"
              {...register("name", { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                border: `2px solid ${errors.name ? '#e63946' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p style={{ color: '#e63946', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {errors.name.message}
              </p>
            )}
          </div>

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
              placeholder="Create a password"
            />
            {errors.password && (
              <p style={{ color: '#e63946', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                border: `2px solid ${errors.confirmPassword ? '#e63946' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p style={{ color: '#e63946', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {errors.confirmPassword.message}
              </p>
            )}
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
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Create Account
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
              Already have an account?{' '}
              <Link to="/login" style={{
                color: '#3a86ff',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Sign In
              </Link>
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

export default RegisterPage;