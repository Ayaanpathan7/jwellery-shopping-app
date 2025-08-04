-- Alternative Products table setup - Add missing columns to existing table
-- Use this if you already have a products table and just need to add missing columns

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add category column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'category') THEN
        ALTER TABLE products ADD COLUMN category TEXT;
    END IF;
    
    -- Add in_stock column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'in_stock') THEN
        ALTER TABLE products ADD COLUMN in_stock BOOLEAN DEFAULT true;
    END IF;
    
    -- Add material column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'material') THEN
        ALTER TABLE products ADD COLUMN material TEXT;
    END IF;
    
    -- Add gemstone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'gemstone') THEN
        ALTER TABLE products ADD COLUMN gemstone TEXT;
    END IF;
    
    -- Add image_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'image_url') THEN
        ALTER TABLE products ADD COLUMN image_url TEXT;
    END IF;
    
    -- Add description column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'description') THEN
        ALTER TABLE products ADD COLUMN description TEXT;
    END IF;
    
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'created_at') THEN
        ALTER TABLE products ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'updated_at') THEN
        ALTER TABLE products ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Enable RLS (Row Level Security) if not already enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;

-- Create policy to allow public read access to products
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to manage products (admin access)
CREATE POLICY "Authenticated users can manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance (with IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_products_updated_at ON products;

-- Create trigger
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT SELECT ON products TO anon;
GRANT ALL ON products TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE products_id_seq TO authenticated;

-- Insert sample data (only if table is empty)
INSERT INTO products (name, description, price, image_url, category, material, gemstone, in_stock)
SELECT * FROM (VALUES
    ('Celestial Necklace', 'A delicate gold chain with a crescent moon pendant, studded with diamonds.', 180.00, 'https://placehold.co/600x600', 'Necklaces', 'gold', 'diamond', true),
    ('Stardust Hoops', 'Elegant silver hoops featuring a spray of tiny embedded crystals.', 120.00, 'https://placehold.co/600x600', 'Earrings', 'silver', 'crystal', true),
    ('Orion Ring', 'A minimalist gold band with three opals set in a row, like Orion''s belt.', 250.00, 'https://placehold.co/600x600', 'Rings', 'gold', 'opal', true),
    ('Luna Bracelet', 'A delicate silver chain bracelet with a moonstone centerpiece.', 95.00, 'https://placehold.co/600x600', 'Bracelets', 'silver', 'moonstone', true),
    ('Ethereal Pendant', 'A rose gold pendant featuring a labradorite stone with color-changing properties.', 160.00, 'https://placehold.co/600x600', 'Necklaces', 'rose-gold', 'labradorite', true),
    ('Midnight Studs', 'Classic gold studs with black onyx stones for a sophisticated look.', 85.00, 'https://placehold.co/600x600', 'Earrings', 'gold', 'onyx', true)
) AS v(name, description, price, image_url, category, material, gemstone, in_stock)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
