// Initialize demo users if none exist
const initializeDemoUsers = () => {
  if (!localStorage.getItem('nexusUsers')) {
    const demoUsers = [
      {
        id: '1',
        name: 'Demo Customer',
        email: 'customer@example.com',
        password: 'password123',
        role: 'customer',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Admin User',
        email: 'admin@nexusshop.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('nexusUsers', JSON.stringify(demoUsers));
    console.log('Demo users initialized');
  }
};

export default initializeDemoUsers;