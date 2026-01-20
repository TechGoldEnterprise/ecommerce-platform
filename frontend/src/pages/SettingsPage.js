import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { user } = useSelector(state => state.auth);
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      securityAlerts: true
    },
    privacy: {
      showProfile: true,
      personalizedRecs: false,
      shareData: true
    }
  });

  // Load settings from localStorage
  useEffect(() => {
    if (user?.id) {
      const savedSettings = localStorage.getItem(`nexus_settings_${user.id}`);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, [user?.id]);

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const saveSettings = () => {
    localStorage.setItem(`nexus_settings_${user.id}`, JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handleChangePassword = () => {
    toast.info('Password change functionality coming soon!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Delete user data
      localStorage.removeItem(`nexus_settings_${user.id}`);
      localStorage.removeItem(`nexus_shipping_${user.id}`);
      localStorage.removeItem(`nexus_wishlist_${user.id}`);
      localStorage.removeItem(`nexus_orders_${user.id}`);
      
      // Remove user from users list
      const users = JSON.parse(localStorage.getItem('nexusUsers') || '[]');
      const updatedUsers = users.filter(u => u.id !== user.id);
      localStorage.setItem('nexusUsers', JSON.stringify(updatedUsers));
      
      // Remove current user
      localStorage.removeItem('nexusCurrentUser');
      
      toast.success('Account deleted successfully');
      window.location.href = '/';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          <i className="fas fa-cog" style={{ marginRight: '15px' }}></i>
          Settings
        </h1>
        
        <button 
          onClick={saveSettings}
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
          <i className="fas fa-save"></i>
          Save Settings
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Notification Settings */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>
            <i className="fas fa-bell" style={{ marginRight: '10px', color: '#3a86ff' }}></i>
            Notification Settings
          </h2>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Order updates and shipping notifications</span>
              <div 
                onClick={() => handleToggle('notifications', 'orderUpdates')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.notifications.orderUpdates ? '#3a86ff' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.notifications.orderUpdates ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Promotions and special offers</span>
              <div 
                onClick={() => handleToggle('notifications', 'promotions')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.notifications.promotions ? '#3a86ff' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.notifications.promotions ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Newsletter and product updates</span>
              <div 
                onClick={() => handleToggle('notifications', 'newsletter')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.notifications.newsletter ? '#3a86ff' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.notifications.newsletter ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Account security alerts</span>
              <div 
                onClick={() => handleToggle('notifications', 'securityAlerts')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.notifications.securityAlerts ? '#3a86ff' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.notifications.securityAlerts ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>
            <i className="fas fa-shield-alt" style={{ marginRight: '10px', color: '#7209b7' }}></i>
            Privacy Settings
          </h2>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Show my profile to other users</span>
              <div 
                onClick={() => handleToggle('privacy', 'showProfile')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.privacy.showProfile ? '#7209b7' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.privacy.showProfile ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Allow personalized recommendations</span>
              <div 
                onClick={() => handleToggle('privacy', 'personalizedRecs')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.privacy.personalizedRecs ? '#7209b7' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.privacy.personalizedRecs ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>Share anonymous usage data</span>
              <div 
                onClick={() => handleToggle('privacy', 'shareData')}
                style={{
                  width: '50px',
                  height: '26px',
                  background: settings.privacy.shareData ? '#7209b7' : '#ddd',
                  borderRadius: '13px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: settings.privacy.shareData ? '27px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s'
                }}></div>
              </div>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>
            <i className="fas fa-lock" style={{ marginRight: '10px', color: '#38b000' }}></i>
            Security Settings
          </h2>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <button 
              onClick={handleChangePassword}
              style={{
                background: 'linear-gradient(135deg, #3a86ff, #7209b7)',
                color: 'white',
                border: 'none',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              <i className="fas fa-key"></i>
              Change Password
            </button>
            
            <button 
              onClick={handleDeleteAccount}
              style={{
                background: 'white',
                color: '#e63946',
                border: '2px solid #e63946',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              <i className="fas fa-trash-alt"></i>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;