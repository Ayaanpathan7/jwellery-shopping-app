-- Luna Gems Database Schema

-- Create products table
CREATE TABLE public.products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    ai_hint TEXT NOT NULL,
    material TEXT NOT NULL CHECK (material IN ('gold', 'silver', 'rose-gold', 'brass')),
    gemstone TEXT NOT NULL CHECK (gemstone IN ('diamond', 'crystal', 'opal', 'labradorite', 'moonstone', 'onyx', 'none')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create reviews table
CREATE TABLE public.reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create orders table
CREATE TABLE public.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create order_items table
CREATE TABLE public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products table
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for orders table
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, images, ai_hint, material, gemstone, is_featured, in_stock) VALUES
('Celestial Necklace', 'A delicate gold chain with a crescent moon pendant, studded with diamonds.', 180.00, 
 ARRAY['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'], 
 'gold necklace', 'gold', 'diamond', true, true),

('Stardust Hoops', 'Elegant silver hoops featuring a spray of tiny embedded crystals.', 120.00,
 ARRAY['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
 'silver earrings', 'silver', 'crystal', true, true),

('Orion Ring', 'A minimalist gold band with three opals set in a row, like Orion''s belt.', 250.00,
 ARRAY['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
 'gold ring', 'gold', 'opal', true, true),

('Aurora Earrings', 'Rose gold drop earrings with iridescent labradorite stones.', 140.00,
 ARRAY['https://placehold.co/600x600', 'https://placehold.co/600x600'],
 'rose gold earrings', 'rose-gold', 'labradorite', false, true),

('Lunar Bracelet', 'A delicate silver bracelet adorned with moonstone charms.', 95.00,
 ARRAY['https://placehold.co/600x600', 'https://placehold.co/600x600'],
 'silver bracelet', 'silver', 'moonstone', false, true),

('Galaxy Pendant', 'A statement gold pendant featuring a black onyx center stone.', 220.00,
 ARRAY['https://placehold.co/600x600', 'https://placehold.co/600x600'],
 'gold pendant', 'gold', 'onyx', false, true);

-- Set up Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Products are editable by authenticated users" ON public.products
    FOR ALL USING (auth.role() = 'authenticated');

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert reviews" ON public.reviews
    FOR INSERT WITH CHECK (true);

-- Contact submissions policies
CREATE POLICY "Anyone can insert contact submissions" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Contact submissions are viewable by authenticated users" ON public.contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Orders are editable by authenticated users" ON public.orders
    FOR ALL USING (auth.role() = 'authenticated');

-- Order items policies
CREATE POLICY "Order items are viewable by order owner" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Order items are editable by authenticated users" ON public.order_items
    FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_products_featured ON public.products (is_featured);
CREATE INDEX idx_products_material ON public.products (material);
CREATE INDEX idx_products_gemstone ON public.products (gemstone);
CREATE INDEX idx_products_in_stock ON public.products (in_stock);
CREATE INDEX idx_reviews_product_id ON public.reviews (product_id);
CREATE INDEX idx_reviews_created_at ON public.reviews (created_at DESC);
CREATE INDEX idx_orders_user_id ON public.orders (user_id);
CREATE INDEX idx_orders_status ON public.orders (status);
CREATE INDEX idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items (order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items (product_id);
