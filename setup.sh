#!/bin/bash

# Luna Gems Development Setup Script

echo "🌙 Setting up Luna Gems Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration - REPLACE WITH YOUR VALUES
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Configuration
ADMIN_EMAIL=admin@lunagems.com
EOF
    echo "📝 Created .env.local file. Please update it with your Supabase credentials."
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run the SQL schema in your Supabase project (see supabase-schema.sql)"
echo "   📋 The schema includes: products, reviews, contact_submissions, orders, and order_items tables"
echo "3. Populate the database with sample data: ./setup-database.sh"
echo "4. Start the development server: npm run dev"
echo ""
echo "🔐 Authentication Info:"
echo "   • Users can browse without login"
echo "   • Login required only for placing orders (/checkout)"
echo "   • Admin access requires login (admin@lunagems.com)"
echo ""
echo "📚 For detailed setup instructions, see README.md"
echo "🌐 App will be available at: http://localhost:9002"
