const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'Not found');

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        console.log('📋 Testing products table...');
        
        const { data, error } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });
            
        if (error) {
            console.error('❌ Database error:', error.message);
            if (error.message.includes('relation "public.products" does not exist')) {
                console.log('\n📝 Solution:');
                console.log('1. Go to your Supabase dashboard');
                console.log('2. Open the SQL Editor');
                console.log('3. Run the contents of supabase-schema.sql');
                console.log('4. Then run: ./setup-database.sh');
            }
        } else {
            console.log('✅ Database connection successful');
            console.log('📊 Products table exists and is accessible');
            
            // Check for actual products
            const { data: products, error: productError } = await supabase
                .from('products')
                .select('*')
                .limit(3);
                
            if (productError) {
                console.error('❌ Error fetching products:', productError.message);
            } else {
                console.log(`📦 Found ${products?.length || 0} products in database`);
                if (products && products.length > 0) {
                    console.log('   Sample product:', products[0].name);
                } else {
                    console.log('💡 Run ./setup-database.sh to add sample products');
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Connection test failed:', error.message);
    }
}

testConnection();
