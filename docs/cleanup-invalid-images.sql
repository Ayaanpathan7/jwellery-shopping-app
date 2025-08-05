-- Clean up invalid image URLs in products table
-- Run this in your Supabase SQL editor to fix any Google image URLs

-- Update any Google image URLs to placeholder
UPDATE products 
SET image_url = 'https://placehold.co/600x600/f3f4f6/9ca3af?text=Product+Image'
WHERE image_url LIKE '%google.com%' 
   OR image_url LIKE '%gstatic.com%'
   OR image_url LIKE '%googleusercontent.com%';

-- Update any other common problematic domains
UPDATE products 
SET image_url = 'https://placehold.co/600x600/f3f4f6/9ca3af?text=Product+Image'
WHERE image_url LIKE '%amazon.%'
   OR image_url LIKE '%ebay.%'
   OR image_url LIKE '%aliexpress.%';

-- Show products that might still have invalid URLs
SELECT id, name, image_url 
FROM products 
WHERE image_url NOT LIKE 'https://placehold.co/%'
  AND image_url NOT LIKE 'https://images.unsplash.com/%'
  AND image_url NOT LIKE 'https://res.cloudinary.com/%'
  AND image_url NOT LIKE 'https://via.placeholder.com/%'
  AND image_url NOT LIKE 'https://picsum.photos/%'
  AND image_url IS NOT NULL
  AND image_url != '';
