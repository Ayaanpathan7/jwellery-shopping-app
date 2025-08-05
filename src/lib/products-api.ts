import { createClient } from '@supabase/supabase-js'

// Handle missing environment variables during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const supabase = createClient(supabaseUrl, supabaseKey)

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  ai_hint: string;
  material: string;
  gemstone: string;
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
  category?: string;
};

// Database product type (from Supabase)
type DbProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image_urls?: string[]; // For multiple images
  material: string;
  gemstone: string;
  in_stock: boolean;
  created_at: string;
  category: string;
};

// Convert database product to frontend product format
function convertDbProductToProduct(dbProduct: DbProduct): Product {
  // Handle multiple images from database
  let images: string[] = [];
  
  // If image_urls array exists, use it
  if (dbProduct.image_urls && Array.isArray(dbProduct.image_urls) && dbProduct.image_urls.length > 0) {
    images = dbProduct.image_urls.filter(url => url && url.trim() !== '');
  }
  // Otherwise, use single image_url if it exists
  else if (dbProduct.image_url && dbProduct.image_url.trim() !== '') {
    images = [dbProduct.image_url];
  }
  
  // If no images, don't add placeholder - let the frontend handle it
  if (images.length === 0) {
    images = [];
  }

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description || '',
    price: dbProduct.price,
    images: images,
    ai_hint: `${dbProduct.material} ${dbProduct.category?.toLowerCase() || 'jewelry'}`,
    material: dbProduct.material || 'gold',
    gemstone: dbProduct.gemstone || 'none',
    is_featured: Math.random() > 0.7, // Random featured status for now
    in_stock: dbProduct.in_stock,
    created_at: dbProduct.created_at,
    category: dbProduct.category
  };
}

// Fallback data for development
export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Celestial Necklace',
    description: 'A delicate gold chain with a crescent moon pendant, studded with diamonds.',
    price: 180.00,
    images: [
        'https://placehold.co/600x600/D4AF37/FFFFFF?text=Gold+Necklace',
        'https://placehold.co/600x600/FFD700/000000?text=Celestial+Moon',
        'https://placehold.co/600x600/B8860B/FFFFFF?text=Diamond+Pendant',
    ],
    ai_hint: 'gold necklace',
    material: 'gold',
    gemstone: 'diamond',
    is_featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Stardust Hoops',
    description: 'Elegant silver hoops featuring a spray of tiny embedded crystals.',
    price: 120.00,
    images: [
        'https://placehold.co/600x600/C0C0C0/000000?text=Silver+Hoops',
        'https://placehold.co/600x600/E5E5E5/333333?text=Crystal+Details',
        'https://placehold.co/600x600/DCDCDC/000000?text=Stardust+Design',
    ],
    ai_hint: 'silver earrings',
    material: 'silver',
    gemstone: 'crystal',
    is_featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Orion Ring',
    description: 'A minimalist gold band with three opals set in a row, like Orion\'s belt.',
    price: 250.00,
    images: [
        'https://placehold.co/600x600/D4AF37/FFFFFF?text=Gold+Ring',
        'https://placehold.co/600x600/FFE5B4/000000?text=Opal+Stones',
        'https://placehold.co/600x600/F0E68C/333333?text=Orion+Design',
    ],
    ai_hint: 'gold ring',
    material: 'gold',
    gemstone: 'opal',
    is_featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching products:', error);
      return fallbackProducts;
    }

    if (!data || data.length === 0) {
      console.log('No products found in database, using fallback');
      return fallbackProducts;
    }

    return data.map(convertDbProductToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return fallbackProducts;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (error) {
      console.error('Supabase error fetching product:', error);
      return fallbackProducts.find(p => p.id === parseInt(id)) || null;
    }

    if (!data) {
      return fallbackProducts.find(p => p.id === parseInt(id)) || null;
    }

    return convertDbProductToProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return fallbackProducts.find(p => p.id === parseInt(id)) || null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(product => product.is_featured);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return fallbackProducts.filter(p => p.is_featured);
  }
}

// Legacy export for backwards compatibility
export const products = fallbackProducts;
