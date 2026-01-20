// src/pages/ContactPage.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Thank you for your message! We’ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '15px',
          textAlign: 'center',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 20px rgba(58, 134, 255, 0.25)'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Get in Touch
        </h1>
        <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
          Have questions or feedback? We’d love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#333' }}>Contact Information</h2>
          <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '2rem' }}>
            Reach out anytime — we respond within 24 hours.
          </p>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
            <i className="fas fa-envelope" style={{ color: '#3a86ff', fontSize: '1.3rem', marginTop: '4px' }}></i>
            <div>
              <strong>Email</strong><br />
              <a
                href="mailto:techgold127@gmail.com"
                style={{ color: '#3a86ff', textDecoration: 'none', fontWeight: '500' }}
              >
                techgold127@gmail.com
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
            <i className="fas fa-phone" style={{ color: '#3a86ff', fontSize: '1.3rem', marginTop: '4px' }}></i>
            <div>
              <strong>Phone</strong><br />
              <a
                href="tel:+2348138570933"
                style={{ color: '#3a86ff', textDecoration: 'none', fontWeight: '500' }}
              >
                +234 813 857 0933
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <i className="fas fa-clock" style={{ color: '#3a86ff', fontSize: '1.3rem', marginTop: '4px' }}></i>
            <div>
              <strong>Support Hours</strong><br />
              Monday – Friday, 9:00 AM – 6:00 PM (WAT)
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            border: '1px solid rgba(58, 134, 255, 0.1)'
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'opacity 0.3s'
              }}
              onMouseOver={(e) => (e.target.style.opacity = '0.9')}
              onMouseOut={(e) => (e.target.style.opacity = '1')}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;