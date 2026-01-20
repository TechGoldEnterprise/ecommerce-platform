const fs = require('fs');
const path = require('path');

console.log('🔧 Generating environment configuration...');

// Read environment variables from process or use defaults
const envConfig = {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  REACT_APP_ENV: process.env.REACT_APP_ENV || 'development',
  REACT_APP_SITE_URL: process.env.REACT_APP_SITE_URL || 'http://localhost:3000'
};

// Create env.js content
const envContent = `// Auto-generated environment configuration
window.env = ${JSON.stringify(envConfig, null, 2)};
console.log('Environment loaded:', window.env);`;

// Create scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Write to public directory
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'env.js'), envContent);

console.log('✅ Environment file created successfully!');
console.log('📊 Configuration:');
console.log('- API URL:', envConfig.REACT_APP_API_URL);
console.log('- Environment:', envConfig.REACT_APP_ENV);
console.log('- Site URL:', envConfig.REACT_APP_SITE_URL);