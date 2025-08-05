#!/bin/bash

echo "🔧 Cloudinary Environment Setup Helper"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local file exists"
    echo ""
    echo "Add these Cloudinary variables to your .env.local file:"
else
    echo "⚠️  .env.local file not found. Creating one..."
    touch .env.local
    echo "✅ Created .env.local file"
    echo ""
    echo "Adding Cloudinary variables..."
fi

echo ""
echo "# Cloudinary Configuration (Add these to your .env.local)" 
echo "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here"
echo "CLOUDINARY_API_KEY=your_api_key_here" 
echo "CLOUDINARY_API_SECRET=your_api_secret_here"
echo "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=luna_gems_products"
echo ""
echo "📝 Replace 'your_cloud_name_here' with your actual Cloudinary cloud name"
echo "📝 Replace 'your_api_key_here' with your actual API key"
echo "📝 Replace 'your_api_secret_here' with your actual API secret"
echo ""
echo "💡 To find these values:"
echo "   1. Go to https://cloudinary.com/console"
echo "   2. Your Cloud Name, API Key, and API Secret are on the dashboard"
echo ""
echo "📂 Don't forget to create the upload preset 'luna_gems_products' in Cloudinary!"
