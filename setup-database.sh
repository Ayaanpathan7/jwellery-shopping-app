#!/bin/bash

# Database Setup Script for Luna Gems

echo "🗄️  Setting up Luna Gems Database..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found. Please run setup.sh first."
    exit 1
fi

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Check if Supabase credentials are set
if [[ "$NEXT_PUBLIC_SUPABASE_URL" == "your_supabase_project_url" ]] || [[ -z "$NEXT_PUBLIC_SUPABASE_URL" ]]; then
    echo "❌ Please update .env.local with your actual Supabase credentials first."
    echo "Current URL: $NEXT_PUBLIC_SUPABASE_URL"
    exit 1
fi

echo "✅ Supabase credentials found"
echo "URL: $NEXT_PUBLIC_SUPABASE_URL"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    exit 1
fi

echo "📋 Creating database setup script..."

# Create a Node.js script to populate the database
cat > temp_db_setup.js << 'EOF'
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const fallbackProducts = [
    {
        name: 'Celestial Necklace',
        description: 'A delicate gold chain with a crescent moon pendant, studded with diamonds.',
        price: 180.00,
        images: [
            'https://placehold.co/600x600',
            'https://placehold.co/600x600',
            'https://placehold.co/600x600',
        ],
        ai_hint: 'gold necklace',
        material: 'gold',
        gemstone: 'diamond',
        is_featured: true,
        in_stock: true,
    },
    {
        name: 'Stardust Hoops',
        description: 'Elegant silver hoops featuring a spray of tiny embedded crystals.',
        price: 120.00,
        images: [
            'https://placehold.co/600x600',
            'https://placehold.co/600x600',
            'https://placehold.co/600x600',
        ],
        ai_hint: 'silver earrings',
        material: 'silver',
        gemstone: 'crystal',
        is_featured: true,
        in_stock: true,
    },
    {
        name: 'Orion Ring',
        description: 'A stunning rose gold ring with an opal centerpiece, surrounded by delicate moonstone accents.',
        price: 250.00,
        images: [
            'https://placehold.co/600x600',
            'https://placehold.co/600x600',
            'https://placehold.co/600x600',
        ],
        ai_hint: 'gold ring',
        material: 'gold',
        gemstone: 'opal',
        is_featured: true,
        in_stock: true,
    },
];

async function setupDatabase() {
    try {
        console.log('🔍 Checking database connection...');
        
        // Test connection
        const { data: testData, error: testError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });
            
        if (testError) {
            if (testError.message.includes('relation "public.products" does not exist')) {
                console.log('❌ Products table does not exist. Please run the SQL schema first:');
                console.log('   1. Go to your Supabase dashboard');
                console.log('   2. Open the SQL Editor');
                console.log('   3. Run the contents of supabase-schema.sql');
                process.exit(1);
            } else {
                console.error('❌ Database connection error:', testError.message);
                process.exit(1);
            }
        }
        
        console.log('✅ Database connection successful');
        
        // Check if products already exist
        const { data: existingProducts, error: checkError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });
            
        if (checkError) {
            console.error('❌ Error checking existing products:', checkError.message);
            process.exit(1);
        }
        
        const productCount = existingProducts?.count || 0;
        
        if (productCount > 0) {
            console.log(`✅ Database already contains ${productCount} products`);
            console.log('🎉 Database setup complete!');
            return;
        }
        
        console.log('📦 Inserting sample products...');
        
        // Insert sample products
        const { data, error } = await supabase
            .from('products')
            .insert(fallbackProducts)
            .select();
            
        if (error) {
            console.error('❌ Error inserting products:', error.message);
            process.exit(1);
        }
        
        console.log(`✅ Successfully inserted ${data.length} sample products`);
        console.log('🎉 Database setup complete!');
        
    } catch (error) {
        console.error('❌ Unexpected error:', error.message);
        process.exit(1);
    }
}

setupDatabase();
EOF

echo "🚀 Running database setup..."
node temp_db_setup.js

# Clean up
rm temp_db_setup.js

echo ""
echo "🎉 Database setup complete!"
echo "🌐 You can now start the development server: npm run dev"
