// src/pages/TestPage.js
import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1>NexusShop is Working! 🎉</h1>
      <p>Frontend: http://localhost:3000</p>
      <p>Backend API: http://localhost:5000</p>
      <div style={{ marginTop: '30px' }}>
        <h3>Test Links:</h3>
        <p><a href="http://localhost:5000/api/test" style={{ color: 'white' }} target="_blank" rel="noopener noreferrer">
          Test Backend API
        </a></p>
        <p><a href="http://localhost:5000/api/products" style={{ color: 'white' }} target="_blank" rel="noopener noreferrer">
          Test Products API
        </a></p>
      </div>
    </div>
  );
};

export default TestPage;