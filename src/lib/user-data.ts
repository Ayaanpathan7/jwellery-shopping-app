import { supabase } from './auth'

export interface CartItem {
  id: string
  user_id: string
  product_id: number
  quantity: number
  product?: any
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: number
  product?: any
}

// Cart Operations
export async function getUserCart(userId: string): Promise<CartItem[]> {
  try {
    const { data, error } = await supabase
      .from('user_cart')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      // If table doesn't exist, return empty array
      if (error.message?.includes('relation "user_cart" does not exist')) {
        console.warn('user_cart table does not exist. Please run the database setup SQL.')
        return []
      }
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error fetching user cart:', error)
    return []
  }
}

export async function addToCart(userId: string, productId: number, quantity: number = 1): Promise<boolean> {
  try {
    // Check if item already exists
    const { data: existing } = await supabase
      .from('user_cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (existing) {
      // Update quantity
      const { error } = await supabase
        .from('user_cart')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
      
      if (error) throw error
    } else {
      // Insert new item
      const { error } = await supabase
        .from('user_cart')
        .insert({ user_id: userId, product_id: productId, quantity })
      
      if (error) throw error
    }
    
    return true
  } catch (error) {
    // If table doesn't exist, provide helpful error message
    if (error instanceof Error && error.message?.includes('relation "user_cart" does not exist')) {
      console.warn('user_cart table does not exist. Please run the database setup SQL.')
      return false
    }
    console.error('Error adding to cart:', error)
    return false
  }
}

export async function updateCartQuantity(userId: string, productId: number, quantity: number): Promise<boolean> {
  try {
    if (quantity <= 0) {
      return await removeFromCart(userId, productId)
    }

    const { error } = await supabase
      .from('user_cart')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating cart quantity:', error)
    return false
  }
}

export async function removeFromCart(userId: string, productId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_cart')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error removing from cart:', error)
    return false
  }
}

export async function clearCart(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_cart')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error clearing cart:', error)
    return false
  }
}

// Wishlist Operations
export async function getUserWishlist(userId: string): Promise<WishlistItem[]> {
  try {
    const { data, error } = await supabase
      .from('user_wishlist')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      // If table doesn't exist, return empty array
      if (error.message?.includes('relation "user_wishlist" does not exist')) {
        console.warn('user_wishlist table does not exist. Please run the database setup SQL.')
        return []
      }
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error fetching user wishlist:', error)
    return []
  }
}

export async function addToWishlist(userId: string, productId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_wishlist')
      .insert({ user_id: userId, product_id: productId })

    if (error) throw error
    return true
  } catch (error) {
    // If table doesn't exist, provide helpful error message
    if (error instanceof Error && error.message?.includes('relation "user_wishlist" does not exist')) {
      console.warn('user_wishlist table does not exist. Please run the database setup SQL.')
      return false
    }
    console.error('Error adding to wishlist:', error)
    return false
  }
}

export async function removeFromWishlist(userId: string, productId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return false
  }
}

export async function isInWishlist(userId: string, productId: number): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  } catch (error) {
    console.error('Error checking wishlist:', error)
    return false
  }
}

// Migration helpers to move localStorage data to database
export async function migrateLocalCartToDatabase(userId: string): Promise<void> {
  try {
    const localCart = localStorage.getItem('luna-gems-cart')
    if (!localCart) return

    const cartItems = JSON.parse(localCart)
    for (const item of cartItems) {
      await addToCart(userId, parseInt(item.product.id), item.quantity)
    }

    // Clear localStorage after migration
    localStorage.removeItem('luna-gems-cart')
  } catch (error) {
    console.error('Error migrating local cart:', error)
  }
}

export async function migrateLocalWishlistToDatabase(userId: string): Promise<void> {
  try {
    const localWishlist = localStorage.getItem('luna-gems-wishlist')
    if (!localWishlist) return

    const wishlistItems = JSON.parse(localWishlist)
    for (const productId of wishlistItems) {
      await addToWishlist(userId, productId)
    }

    // Clear localStorage after migration
    localStorage.removeItem('luna-gems-wishlist')
  } catch (error) {
    console.error('Error migrating local wishlist:', error)
  }
}
