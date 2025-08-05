#!/bin/bash

echo "🔧 Setting up environment variables for Luna Gems Orders System"
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Please update it manually with the required variables."
    echo ""
    echo "Required variables:"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY" 
    echo "- SUPABASE_SERVICE_ROLE_KEY"
    echo ""
    echo "See .env.example for the format."
    exit 0
fi

echo "📝 Creating .env.local file..."
echo ""

read -p "Enter your Supabase URL: " SUPABASE_URL
read -p "Enter your Supabase anon key: " SUPABASE_ANON_KEY
read -p "Enter your Supabase service role key: " SUPABASE_SERVICE_ROLE_KEY

cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
EOF

echo ""
echo "✅ .env.local file created successfully!"
echo "🚀 You can now run the orders SQL script and test the checkout functionality."
echo ""
echo "Next steps:"
echo "1. Run the SQL script in your Supabase dashboard"
echo "2. Restart your development server: npm run dev"
echo "3. Test the checkout flow"
