-- Update product images with real jewelry photos from Unsplash

-- Update Celestial Necklace with elegant gold necklace images
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1611955167811-4711904bb9ab?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
]
WHERE name = 'Celestial Necklace';

-- Update Stardust Hoops with silver hoop earrings
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
]
WHERE name = 'Stardust Hoops';

-- Update Orion Ring with elegant gold ring images
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1588444837806-6c0ac313e5d8?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
]
WHERE name = 'Orion Ring';

-- Update Aurora Earrings with rose gold earrings
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1596944946061-b0ea6cb692e6?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
]
WHERE name = 'Aurora Earrings';

-- Update Moonstone Bracelet with silver bracelet images
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1506629905057-f39a2e0b7e56?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
]
WHERE name = 'Moonstone Bracelet';

-- Update Eclipse Choker with elegant necklace images
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1611955167811-4711904bb9ab?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
]
WHERE name = 'Eclipse Choker';

-- Add some additional featured products with stunning jewelry images
INSERT INTO public.products (name, description, price, images, ai_hint, material, gemstone, is_featured, in_stock) VALUES
('Diamond Solitaire Ring', 'Classic diamond solitaire engagement ring in 18k white gold setting.', 2800.00, 
 ARRAY[
   'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1588444837806-6c0ac313e5d8?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
 ], 
 'diamond engagement ring', 'gold', 'diamond', true, true),

('Pearl Drop Earrings', 'Elegant freshwater pearl drop earrings with gold accents.', 320.00,
 ARRAY[
   'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
 ],
 'pearl earrings', 'gold', 'none', true, true),

('Vintage Rose Necklace', 'Delicate rose gold chain with vintage-inspired crystal pendant.', 450.00,
 ARRAY[
   'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1611955167811-4711904bb9ab?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
 ],
 'rose gold necklace', 'rose-gold', 'crystal', true, true),

('Sapphire Tennis Bracelet', 'Stunning sapphire and diamond tennis bracelet in white gold.', 1200.00,
 ARRAY[
   'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1506629905057-f39a2e0b7e56?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
 ],
 'sapphire bracelet', 'gold', 'diamond', false, true),

('Art Deco Cufflinks', 'Sophisticated brass cufflinks with geometric onyx inlay.', 180.00,
 ARRAY[
   'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
   'https://images.unsplash.com/photo-1588444837806-6c0ac313e5d8?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3'
 ],
 'brass cufflinks', 'brass', 'onyx', false, true);
