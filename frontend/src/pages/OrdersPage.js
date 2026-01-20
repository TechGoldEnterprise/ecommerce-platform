import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);

  // Load user's orders from localStorage
  useEffect(() => {
    if (user?.id) {
      const userOrders = localStorage.getItem(`nexus_orders_${user.id}`);
      if (userOrders) {
        setOrders(JSON.parse(userOrders));
      }
    }
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#38b000';
      case 'Shipped': return '#3a86ff';
      case 'Processing': return '#ff9e00';
      case 'Pending': return '#ff9e00';
      case 'Cancelled': return '#e63946';
      default: return '#666';
    }
  };

  const handleReorder = (order) => {
    // Add order items to cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    order.items.forEach(item => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.push(item);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/cart';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5rem',
        background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem',
        fontWeight: 'bold'
      }}>
        <i className="fas fa-shopping-bag" style={{ marginRight: '15px' }}></i>
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.05), rgba(114, 9, 183, 0.05))',
          borderRadius: '15px'
        }}>
          <i className="fas fa-shopping-bag" style={{
            fontSize: '4rem',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem'
          }}></i>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
            No Orders Yet
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            You haven't placed any orders. Start shopping to see your orders here!
          </p>
          <Link to="/products" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.1), rgba(114, 9, 183, 0.1))',
              fontWeight: '600',
              color: '#333',
              gap: '1rem'
            }}>
              <div>Order ID</div>
              <div>Date</div>
              <div>Items</div>
              <div>Total</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {orders.map(order => (
              <div key={order.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr',
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #eee',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: '#3a86ff' }}>{order.id}</div>
                <div style={{ color: '#666' }}>{new Date(order.date).toLocaleDateString()}</div>
                <div style={{ color: '#666' }}>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                <div style={{ fontWeight: '600', color: '#333' }}>${order.total.toFixed(2)}</div>
                <div>
                  <span style={{
                    background: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status),
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <button 
                    onClick={() => handleReorder(order)}
                    style={{
                      background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                      color: 'white',
                      border: 'none',
                      padding: '0.6rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <i className="fas fa-redo"></i>
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3a86ff, #4361ee)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{orders.length}</h3>
              <p>Total Orders</p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #7209b7, #3a0ca3)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </h3>
              <p>Total Spent</p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #4cc9f0, #4361ee)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {orders.filter(o => o.status === 'Delivered').length}
              </h3>
              <p>Completed Orders</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;