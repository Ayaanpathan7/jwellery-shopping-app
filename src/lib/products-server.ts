// Server-side data fetching functions - only for use in server components
import { createClient } from '@/lib/supabase-server'
import type { Product } from './products-api'
import { fallbackProducts } from './products-api'

// Database product type (matching Supabase schema)
type DbProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  material: string;
  gemstone: string;
  in_stock: boolean;
  created_at: string;
  category: string;
};

// Convert database product to frontend product format
function convertDbProductToProduct(dbProduct: DbProduct): Product {
  // Handle single image from database
  let images: string[] = [];
  
  // Use single image_url if it exists
  if (dbProduct.image_url && dbProduct.image_url.trim() !== '') {
    images = [dbProduct.image_url];
  }
  
  // If no images, leave empty array (will use placeholder in component)
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
    is_featured: dbProduct.id % 3 === 0, // Make every 3rd product featured (more predictable than random)
    in_stock: dbProduct.in_stock,
    created_at: dbProduct.created_at,
    category: dbProduct.category,
  };
}

export async function getProductsServer(): Promise<Product[]> {
  try {
    // If no Supabase URL is configured, use fallback products
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.log('Supabase not configured, using fallback products')
      return fallbackProducts
    }

    const supabase = await createClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, price, image_url, material, gemstone, in_stock, created_at, category')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2))
      console.log('Using fallback products due to database error')
      return fallbackProducts
    }

    // If no products in database, return fallback products
    if (!products || products.length === 0) {
      console.log('No products found in database, using fallback products')
      return fallbackProducts
    }

    console.log(`Successfully fetched ${products.length} products from database`)
    
    // Convert database products to frontend format
    return products.map(convertDbProductToProduct)
  } catch (error) {
    console.error('Error fetching products:', JSON.stringify(error, null, 2))
    console.log('Using fallback products due to connection error')
    return fallbackProducts
  }
}

export async function getProductServer(id: string): Promise<Product | null> {
  try {
    // If no Supabase URL is configured, use fallback products
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.log('Supabase not configured, using fallback product')
      return fallbackProducts.find(p => p.id === parseInt(id)) || null
    }

    const supabase = await createClient()
    
    const { data: product, error } = await supabase
      .from('products')
      .select('id, name, description, price, image_url, material, gemstone, in_stock, created_at, category')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      console.log(`Using fallback product for id ${id} due to database error`)
      return fallbackProducts.find(p => p.id === parseInt(id)) || null
    }

    // Convert database product to frontend format
    return convertDbProductToProduct(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    console.log(`Using fallback product for id ${id} due to connection error`)
    return fallbackProducts.find(p => p.id === parseInt(id)) || null
  }
}

export async function getFeaturedProductsServer(): Promise<Product[]> {
  try {
    console.log('Fetching featured products...')
    const products = await getProductsServer()
    
    if (!products || products.length === 0) {
      console.log('No products available, returning empty array')
      return []
    }
    
    const featuredProducts = products.filter(product => product.is_featured)
    
    // If no featured products, return first 3 products as featured
    if (featuredProducts.length === 0) {
      console.log('No featured products found, using first 3 products')
      return products.slice(0, 3).map(product => ({ ...product, is_featured: true }))
    }
    
    console.log(`Found ${featuredProducts.length} featured products`)
    return featuredProducts
  } catch (error) {
    console.error('Error fetching featured products:', JSON.stringify(error, null, 2))
    console.log('Returning empty array due to error')
    return []
  }
}
