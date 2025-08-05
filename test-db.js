// Test database connection and table existence
import { createClient } from '@supabase/supabase-js'

// Use the same approach as the app
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testDatabase() {
  console.log('Testing database connection...')
  
  // Test products table (should exist)
  try {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    console.log('Products table:', productsError ? 'ERROR' : 'OK')
    if (productsError) console.log('Products error:', productsError.message)
  } catch (error) {
    console.log('Products table access failed:', error.message)
  }

  // Test user_cart table
  try {
    const { data: cart, error: cartError } = await supabase
      .from('user_cart')
      .select('count')
      .limit(1)
    
    console.log('user_cart table:', cartError ? 'ERROR' : 'OK')
    if (cartError) console.log('user_cart error:', cartError.message)
  } catch (error) {
    console.log('user_cart table access failed:', error.message)
  }

  // Test user_wishlist table
  try {
    const { data: wishlist, error: wishlistError } = await supabase
      .from('user_wishlist')
      .select('count')
      .limit(1)
    
    console.log('user_wishlist table:', wishlistError ? 'ERROR' : 'OK')
    if (wishlistError) console.log('user_wishlist error:', wishlistError.message)
  } catch (error) {
    console.log('user_wishlist table access failed:', error.message)
  }
}

testDatabase()
