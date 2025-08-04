-- Simplified User-specific Cart and Wishlist tables for Luna Gems
-- Run this in your Supabase SQL editor
-- This version works with both authenticated and anonymous users

-- Create user_cart table
CREATE TABLE IF NOT EXISTS user_cart (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create user_wishlist table  
CREATE TABLE IF NOT EXISTS user_wishlist (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS (Row Level Security) but allow anonymous access
ALTER TABLE user_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wishlist ENABLE ROW LEVEL SECURITY;

-- Create permissive policies that work with anonymous users
-- These policies allow all operations but could be made more restrictive later
CREATE POLICY "Allow cart access for all users" ON user_cart
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow wishlist access for all users" ON user_wishlist
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_cart_user_id ON user_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cart_product_id ON user_cart(product_id);
CREATE INDEX IF NOT EXISTS idx_user_wishlist_user_id ON user_wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_user_wishlist_product_id ON user_wishlist(product_id);

-- Create update trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at trigger for user_cart
DROP TRIGGER IF EXISTS update_user_cart_updated_at ON user_cart;
CREATE TRIGGER update_user_cart_updated_at 
    BEFORE UPDATE ON user_cart
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions to anonymous and authenticated users
GRANT ALL ON user_cart TO anon, authenticated;
GRANT ALL ON user_wishlist TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE user_cart_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE user_wishlist_id_seq TO anon, authenticated;
