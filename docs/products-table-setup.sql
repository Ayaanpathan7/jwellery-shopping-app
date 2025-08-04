-- Products table setup for Luna Gems Admin Dashboard
-- Run this in your Supabase SQL editor

-- Check if products table exists and drop it if needed (for clean setup)
DROP TABLE IF EXISTS products CASCADE;

-- Create products table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  material TEXT,
  gemstone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to products
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to manage products (admin access)
CREATE POLICY "Authenticated users can manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Insert sample data from existing products
INSERT INTO products (name, description, price, image_url, category, material, gemstone) VALUES
('Celestial Necklace', 'A delicate gold chain with a crescent moon pendant, studded with diamonds.', 180.00, 'https://placehold.co/600x600', 'Necklaces', 'gold', 'diamond'),
('Stardust Hoops', 'Elegant silver hoops featuring a spray of tiny embedded crystals.', 120.00, 'https://placehold.co/600x600', 'Earrings', 'silver', 'crystal'),
('Orion Ring', 'A minimalist gold band with three opals set in a row, like Orion''s belt.', 250.00, 'https://placehold.co/600x600', 'Rings', 'gold', 'opal'),
('Luna Bracelet', 'A delicate silver chain bracelet with a moonstone centerpiece.', 95.00, 'https://placehold.co/600x600', 'Bracelets', 'silver', 'moonstone'),
('Ethereal Pendant', 'A rose gold pendant featuring a labradorite stone with color-changing properties.', 160.00, 'https://placehold.co/600x600', 'Necklaces', 'rose-gold', 'labradorite'),
('Midnight Studs', 'Classic gold studs with black onyx stones for a sophisticated look.', 85.00, 'https://placehold.co/600x600', 'Earrings', 'gold', 'onyx');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT SELECT ON products TO anon;
GRANT ALL ON products TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE products_id_seq TO authenticated;
