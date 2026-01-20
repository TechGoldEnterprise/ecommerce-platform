import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  const [shippingAddress, setShippingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Load shipping address from localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem(`nexus_shipping_${user?.id}`);
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
      setFormData(JSON.parse(savedAddress));
    }
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = () => {
    if (!formData.address || !formData.city || !formData.zipCode) {
      toast.error('Please fill in required fields: Address, City, and ZIP Code');
      return;
    }

    const newAddress = {
      ...formData,
      id: Date.now().toString(),
      userId: user.id,
      isDefault: true,
      savedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem(`nexus_shipping_${user.id}`, JSON.stringify(newAddress));
    setShippingAddress(newAddress);
    setShowAddressForm(false);
    
    toast.success('Shipping address saved successfully!');
  };

  const handleDeleteAddress = () => {
    localStorage.removeItem(`nexus_shipping_${user.id}`);
    setShippingAddress(null);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    });
    toast.info('Shipping address removed');
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
        <i className="fas fa-user" style={{ marginRight: '15px' }}></i>
        My Profile
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '2rem'
      }}>
        {/* Profile Sidebar */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>
              {user?.name || 'User'}
            </h3>
            <p style={{ color: '#666' }}>{user?.email || 'No email'}</p>
            <div style={{
              background: user?.role === 'admin' ? 'linear-gradient(135deg, #7209b7, #3a0ca3)' : 'linear-gradient(135deg, #3a86ff, #4361ee)',
              color: 'white',
              padding: '0.3rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              display: 'inline-block',
              marginTop: '0.5rem'
            }}>
              {user?.role === 'admin' ? 'Administrator' : 'Customer'}
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #eee',
            paddingTop: '1.5rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: '#333' }}>Account Info</h4>
            <div style={{ color: '#666' }}>
              <p><strong>Member Since:</strong> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
              <p><strong>Account ID:</strong> {user?.id || 'N/A'}</p>
              <p><strong>Orders:</strong> {localStorage.getItem(`nexus_orders_${user?.id}`) ? JSON.parse(localStorage.getItem(`nexus_orders_${user?.id}`)).length : 0}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div>
          {/* Shipping Address Card */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: '#333' }}>
                <i className="fas fa-home" style={{ marginRight: '10px', color: '#7209b7' }}></i>
                Shipping Address
              </h2>
              {!shippingAddress && (
                <button 
                  onClick={() => setShowAddressForm(true)}
                  style={{
                    background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <i className="fas fa-plus"></i>
                  Add Shipping Address
                </button>
              )}
            </div>
            
            {shippingAddress ? (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.05), rgba(114, 9, 183, 0.05))',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>{shippingAddress.name}</p>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{shippingAddress.address}</p>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{shippingAddress.country}</p>
                      <p style={{ margin: '0', color: '#666' }}>📱 {shippingAddress.phone}</p>
                    </div>
                    <span style={{
                      background: '#38b000',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      Default
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    style={{
                      background: 'white',
                      color: '#3a86ff',
                      border: '2px solid #3a86ff',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <i className="fas fa-edit"></i>
                    Edit Address
                  </button>
                  
                  <button 
                    onClick={handleDeleteAddress}
                    style={{
                      background: 'white',
                      color: '#e63946',
                      border: '2px solid #e63946',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <i className="fas fa-trash"></i>
                    Remove Address
                  </button>
                </div>
              </div>
            ) : showAddressForm ? (
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#333' }}>Add Shipping Address</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Street Address *
                    </label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        City *
                      </label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        State
                      </label>
                      <input 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        ZIP Code *
                      </label>
                      <input 
                        type="text" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Country
                    </label>
                    <input 
                      type="text" 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                      onClick={handleSaveAddress}
                      style={{
                        background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Save Address
                    </button>
                    
                    <button 
                      onClick={() => setShowAddressForm(false)}
                      style={{
                        background: 'white',
                        color: '#666',
                        border: '2px solid #ddd',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                No shipping address saved. Add your address for faster checkout.
              </p>
            )}
          </div>

          {/* Account Settings Card - Removed for brevity, keep your existing code */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;