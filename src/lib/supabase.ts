import { createClient } from '@supabase/supabase-js'

// Handle missing environment variables during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          images: string[]
          ai_hint: string
          material: 'gold' | 'silver' | 'rose-gold' | 'brass'
          gemstone: 'diamond' | 'crystal' | 'opal' | 'labradorite' | 'moonstone' | 'onyx' | 'none'
          created_at: string
          updated_at: string
          is_featured: boolean
          in_stock: boolean
        }
        Insert: {
          name: string
          description: string
          price: number
          images: string[]
          ai_hint: string
          material: 'gold' | 'silver' | 'rose-gold' | 'brass'
          gemstone: 'diamond' | 'crystal' | 'opal' | 'labradorite' | 'moonstone' | 'onyx' | 'none'
          is_featured?: boolean
          in_stock?: boolean
        }
        Update: {
          name?: string
          description?: string
          price?: number
          images?: string[]
          ai_hint?: string
          material?: 'gold' | 'silver' | 'rose-gold' | 'brass'
          gemstone?: 'diamond' | 'crystal' | 'opal' | 'labradorite' | 'moonstone' | 'onyx' | 'none'
          is_featured?: boolean
          in_stock?: boolean
        }
      }
      reviews: {
        Row: {
          id: number
          product_id: number
          user_name: string
          user_email: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          product_id: number
          user_name: string
          user_email: string
          rating: number
          comment: string
        }
        Update: {
          user_name?: string
          user_email?: string
          rating?: number
          comment?: string
        }
      }
      contact_submissions: {
        Row: {
          id: number
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          message: string
        }
        Update: {
          name?: string
          email?: string
          message?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          customer_info: {
            firstName: string
            lastName: string
            email: string
            phone: string
            address: string
            city: string
            postalCode: string
            country: string
            notes?: string
          }
          items: {
            productId: number
            productName: string
            quantity: number
            price: number
            total: number
          }[]
          total_amount: number
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          customer_info: {
            firstName: string
            lastName: string
            email: string
            phone: string
            address: string
            city: string
            postalCode: string
            country: string
            notes?: string
          }
          items: {
            productId: number
            productName: string
            quantity: number
            price: number
            total: number
          }[]
          total_amount: number
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
        }
        Update: {
          customer_info?: {
            firstName?: string
            lastName?: string
            email?: string
            phone?: string
            address?: string
            city?: string
            postalCode?: string
            country?: string
            notes?: string
          }
          items?: {
            productId: number
            productName: string
            quantity: number
            price: number
            total: number
          }[]
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
        }
      }
    }
  }
}
