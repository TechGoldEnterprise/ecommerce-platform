#!/bin/bash
echo "🚀 Netlify Build Script"
echo "======================"

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate environment file for Netlify
echo "🔧 Generating environment configuration..."
cat > public/env.js << 'EOF'
window.env = {
  REACT_APP_API_URL: "${REACT_APP_API_URL}",
  REACT_APP_ENV: "${REACT_APP_ENV}",
  REACT_APP_SITE_URL: "${REACT_APP_SITE_URL}"
};
EOF

echo "Environment variables set:"
echo "- REACT_APP_API_URL: ${REACT_APP_API_URL}"
echo "- REACT_APP_ENV: ${REACT_APP_ENV}"
echo "- REACT_APP_SITE_URL: ${REACT_APP_SITE_URL}"

# Build the React app
echo "⚛️ Building React application..."
npm run build

echo "🎉 Build completed successfully!"