import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>$12,450.75</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>89</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>45</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <p>7</p>
        </div>
      </div>
      <p>Admin dashboard will show real-time inventory management, charts, and order management.</p>
    </div>
  );
};

export default AdminDashboard;