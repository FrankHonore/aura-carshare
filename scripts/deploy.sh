#!/bin/bash

# Aura Car Sharing - Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚗 Aura Car Sharing - Deployment Helper"
echo "======================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with required environment variables"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run build
echo "🏗️  Building application..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Available deployment options:"
echo "1. Vercel: vercel --prod"
echo "2. Netlify: netlify deploy --prod"
echo "3. Docker: docker-compose up --build"
echo "4. Manual: npm start (after setting up database)"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"