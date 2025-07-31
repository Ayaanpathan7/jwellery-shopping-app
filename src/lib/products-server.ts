// Server-side data fetching functions - only for use in server components
import { createClient } from '@/lib/supabase-server'
import type { Product } from './products-api'
import { fallbackProducts } from './products-api'

export async function getProductsServer(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      console.log('Using fallback products due to database error')
      return fallbackProducts
    }

    // If no products in database, return fallback products
    if (!products || products.length === 0) {
      console.log('No products found in database, using fallback products')
      return fallbackProducts
    }

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    console.log('Using fallback products due to connection error')
    return fallbackProducts
  }
}

export async function getProductServer(id: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      console.log(`Using fallback product for id ${id} due to database error`)
      return fallbackProducts.find(p => p.id === parseInt(id)) || null
    }

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    console.log(`Using fallback product for id ${id} due to connection error`)
    return fallbackProducts.find(p => p.id === parseInt(id)) || null
  }
}

export async function getFeaturedProductsServer(): Promise<Product[]> {
  try {
    const products = await getProductsServer()
    return products.filter(product => product.is_featured)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}
