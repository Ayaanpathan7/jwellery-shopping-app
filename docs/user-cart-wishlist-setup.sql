-- User-specific Cart and Wishlist tables for Luna Gems
-- Run this in your Supabase SQL editor

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

-- Enable RLS (Row Level Security)
ALTER TABLE user_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wishlist ENABLE ROW LEVEL SECURITY;

-- Create policies for user_cart
CREATE POLICY "Users can view own cart" ON user_cart
  FOR SELECT USING (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert into own cart" ON user_cart
  FOR INSERT WITH CHECK (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

CREATE POLICY "Users can update own cart" ON user_cart
  FOR UPDATE USING (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete from own cart" ON user_cart
  FOR DELETE USING (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

-- Create policies for user_wishlist
CREATE POLICY "Users can view own wishlist" ON user_wishlist
  FOR SELECT USING (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert into own wishlist" ON user_wishlist
  FOR INSERT WITH CHECK (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete from own wishlist" ON user_wishlist
  FOR DELETE USING (user_id = auth.jwt() ->> 'sub' OR user_id = auth.jwt() ->> 'email');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_cart_user_id ON user_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cart_product_id ON user_cart(product_id);
CREATE INDEX IF NOT EXISTS idx_user_wishlist_user_id ON user_wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_user_wishlist_product_id ON user_wishlist(product_id);

-- Create updated_at trigger for user_cart
CREATE TRIGGER update_user_cart_updated_at 
    BEFORE UPDATE ON user_cart
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON user_cart TO authenticated;
GRANT ALL ON user_wishlist TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE user_cart_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE user_wishlist_id_seq TO authenticated;
